// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

import { BeatmapsetJson } from 'beatmapsets/beatmapset-json';
import { NewDocumentIssueEmbed } from 'interfaces/beatmap-discussion-review';
import BeatmapJsonExtended from 'interfaces/beatmap-json-extended';
import * as _ from 'lodash';
import * as React from 'react';
import { Node as SlateNode, Path, Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import { ReactEditor } from 'slate-react';
import { DraftsContext } from './drafts-context';
import EditorBeatmapSelector from './editor-beatmap-selector';
import EditorIssueTypeSelector from './editor-issue-type-selector';
import { SlateContext } from './slate-context';

interface Cache {
  nearbyDiscussions?: {
    beatmap_id: number;
    discussions: BeatmapDiscussion[];
    timestamp: number;
  };
}

interface Props extends RenderElementProps {
  beatmaps: BeatmapJsonExtended[];
  beatmapset: BeatmapsetJson;
  currentBeatmap: BeatmapJsonExtended;
  discussionId?: number;
  discussions: Record<number, BeatmapDiscussion>;
  editMode?: boolean;
  readOnly?: boolean;
}

export default class EditorDiscussionComponent extends React.Component<Props> {
  static contextType = SlateContext;

  bn = 'beatmap-discussion-review-post-embed-preview';
  cache: Cache = {};
  tooltipContent = React.createRef<HTMLDivElement>();

  componentDidMount = () => {
    // reset timestamp to null on clone
    if (this.editable()) {
      Transforms.setNodes(this.context, {timestamp: null}, {at: this.path()});
    }
  }

  componentDidUpdate = () => {
    if (!this.editable()) {
      return;
    }

    const path = this.path();
    let purgeCache = false;

    if (this.props.element.beatmapId) {
      const content = this.props.element.children[0].text;
      const matches = content.match(BeatmapDiscussionHelper.TIMESTAMP_REGEX);
      let timestamp = null;

      // only extract timestamp if it occurs at the start of the issue
      if (matches !== null && matches.index === 0) {
        timestamp = matches[2];
      }

      if (timestamp !== this.props.element.timestamp) {
        purgeCache = true;
      }

      Transforms.setNodes(this.context, {timestamp}, {at: path});
    } else {
      Transforms.setNodes(this.context, {timestamp: null}, {at: path});
      purgeCache = true;
    }

    if (purgeCache) {
      this.cache = {};
    }
  }

  delete = () => {
    Transforms.delete(this.context, { at: this.path() });
  }

  editable = () => {
    return !(this.props.editMode && this.props.element.discussionId);
  }

  nearbyDiscussions = () => {
    const timestamp = this.timestamp();
    if (!timestamp) {
      return [];
    }

    if (!this.cache.nearbyDiscussions || this.cache.nearbyDiscussions.timestamp !== timestamp || (this.cache.nearbyDiscussions.beatmap_id !== this.selectedBeatmap())) {
      const relevantDiscussions = _.filter(this.props.discussions, (discussion: BeatmapDiscussion) => discussion.beatmap_id === this.selectedBeatmap());
      this.cache.nearbyDiscussions = {
        beatmap_id: this.selectedBeatmap(),
        discussions: BeatmapDiscussionHelper.nearbyDiscussions(relevantDiscussions, timestamp),
        timestamp,
      };
    }

    return this.cache.nearbyDiscussions?.discussions;
  }

  nearbyDraftEmbeds = (drafts: SlateNode[]) => {
    const timestamp = this.timestamp();
    if (!timestamp || !drafts || drafts.length === 0) {
      return;
    }

    return drafts.filter((embed) => {
      if (!embed.timestamp || embed.beatmapId !== this.props.element.beatmapId) {
        return false;
      }

      const ts = BeatmapDiscussionHelper.parseTimestamp(embed.timestamp);
      if (!ts) {
        return false;
      }

      return Math.abs(ts - timestamp) < 5000; // TODO: Fix range
    });
  }

  nearbyIndicator = (drafts: SlateNode[]) => {
    if (!this.editable() || !this.timestamp()) {
      return;
    }

    const nearbyDiscussions = this.nearbyDiscussions();
    const nearbyUnsaved = this.nearbyDraftEmbeds(drafts) || [];

    if (nearbyDiscussions.length > 0 || nearbyUnsaved.length > 1) {
      const timestamps =
        nearbyDiscussions.map((discussion) => {
          const timestamp = BeatmapDiscussionHelper.formatTimestamp(discussion.timestamp);
          if (!timestamp) {
            return;
          }
          return osu.link(BeatmapDiscussionHelper.url({discussion}),
            timestamp,
            {classNames: ['js-beatmap-discussion--jump', `${this.bn}__notice-link`]},
          );
        });

      if (nearbyUnsaved.length > 1) {
        timestamps.push(`${nearbyUnsaved.length - 1} in this review`);
      }

      const timestampsString = osu.transArray(timestamps);

      const nearbyText = osu.trans('beatmap_discussions.nearby_posts.notice', {
        timestamp: this.props.element.timestamp,
        existing_timestamps: timestampsString,
      });

      return (
        <div
          className={`${this.bn}__indicator ${this.bn}__indicator--warning`}
          contentEditable={false} // workaround for slatejs 'Cannot resolve a Slate point from DOM point' nonsense
          onMouseOver={this.renderNearbyTooltip}
          onTouchStart={this.renderNearbyTooltip}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: nearbyText,
            }}
            ref={this.tooltipContent}
            style={{
              display: 'none',
            }}
          />
          <i className='fas fa-exclamation-triangle' />
        </div>
      );
    }
  }

  path = (): Path => ReactEditor.findPath(this.context, this.props.element);

  render(): React.ReactNode {
    const canEdit = this.editable();
    const classMods = canEdit ? [] : ['read-only'];
    const timestampTooltipType = this.props.element.beatmapId ? 'diff' : 'all-diff';
    const timestampTooltip = osu.trans(`beatmaps.discussions.review.embed.timestamp.${timestampTooltipType}`, {
        type: osu.trans(`beatmaps.discussions.message_type.${this.props.element.discussionType}`),
      });

    const deleteButton =
      (
        <button
          className={`${this.bn}__delete`}
          disabled={this.props.readOnly}
          onClick={this.delete}
          contentEditable={false}
          title={osu.trans(`beatmaps.discussions.review.embed.${canEdit ? 'delete' : 'unlink'}`)}
        >
          <i className={`fas fa-${canEdit ? 'trash-alt' : 'link'}`} />
        </button>
      );

    const unsavedIndicator =
      this.props.editMode && canEdit ?
        (
          <div
            className={`${this.bn}__indicator`}
            contentEditable={false} // workaround for slatejs 'Cannot resolve a Slate point from DOM point' nonsense
            title={osu.trans('beatmaps.discussions.review.embed.unsaved')}
          >
            <i className='fas fa-pencil-alt'/>
          </div>
        )
      : null;

    return (
      <div
        className='beatmap-discussion beatmap-discussion--preview'
        contentEditable={canEdit}
        suppressContentEditableWarning={true}
        {...this.props.attributes}
      >
        <div className={osu.classWithModifiers(this.bn, classMods)}>
          <div className={`${this.bn}__content`}>
            <div
              className={`${this.bn}__selectors`}
              contentEditable={false} // workaround for slatejs 'Cannot resolve a Slate point from DOM point' nonsense
            >
              <EditorBeatmapSelector {...this.props} disabled={this.props.readOnly || !canEdit}/>
              <EditorIssueTypeSelector {...this.props} disabled={this.props.readOnly || !canEdit}/>
              <div
                className={`${this.bn}__timestamp`}
                contentEditable={false} // workaround for slatejs 'Cannot resolve a Slate point from DOM point' nonsense
              >
                <span title={canEdit ? timestampTooltip : ''}>
                  {this.props.element.timestamp || osu.trans('beatmap_discussions.timestamp_display.general')}
                </span>
              </div>
              {unsavedIndicator}
              <DraftsContext.Consumer>
                {(drafts) => (this.nearbyIndicator(drafts))}
              </DraftsContext.Consumer>
            </div>
            <div
              contentEditable={false} // workaround for slatejs 'Cannot resolve a Slate point from DOM point' nonsense
              className={`${this.bn}__stripe`}
            />
            <div className={`${this.bn}__message-container`}>
              <div className='beatmapset-discussion-message'>{this.props.children}</div>
            </div>
            {unsavedIndicator}
              <DraftsContext.Consumer>
                {(drafts) => (this.nearbyIndicator(drafts))}
              </DraftsContext.Consumer>
          </div>
        </div>
        {deleteButton}
      </div>
    );
  }

  renderNearbyTooltip = (event: (React.MouseEvent | React.TouchEvent)) => {
    const target = event.currentTarget as HTMLElement;

    // TODO: expire tooltip on timestamp/etc change
    if (target._tooltip) {
      return;
    }

    target._tooltip = `${this.selectedBeatmap()}-${this.timestamp()}`;

    $(target).qtip({
      content: {
        text: () => this.tooltipContent.current?.innerHTML,
      },
      hide: {
        fixed: true,
      },
      position: {
        at: 'top center',
        my: 'bottom center',
        viewport: $(window),
      },
      show: {
        ready: true,
      },
      style: {
        classes: 'tooltip-default tooltip-default--interactable',
      },
    });
  }

  selectedBeatmap = () => this.props.element.beatmapId;

  timestamp = () => BeatmapDiscussionHelper.parseTimestamp(this.props.element.timestamp);
}
