// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

import GameMode from 'interfaces/game-mode';
import SoloScoreJson, { SoloScoreStatisticsAttribute } from 'interfaces/solo-score-json';
import { route } from 'laroute';
import core from 'osu-core-singleton';
import { rulesetName } from './beatmap-helper';
import { trans } from './lang';
import { legacyAccuracyAndRank } from './legacy-score-helper';

export function accuracy(score: SoloScoreJson) {
  return shouldReturnLegacyValue(score)
    ? legacyAccuracyAndRank(score).accuracy
    : score.accuracy;
}

export function canBeReported(score: SoloScoreJson) {
  return (score.best_id != null || score.type === 'solo_score')
    && core.currentUser != null
    && score.user_id !== core.currentUser.id;
}

// Removes CL mod on legacy score if user has lazer mode disabled
export function filterMods(score: SoloScoreJson) {
  return shouldReturnLegacyValue(score)
    ? score.mods.filter((mod) => mod.acronym !== 'CL')
    : score.mods;

}

// TODO: move to application state repository thingy later
export function hasMenu(score: SoloScoreJson) {
  return canBeReported(score) || hasReplay(score) || hasShow(score) || core.scorePins.canBePinned(score);
}

export function hasReplay(score: SoloScoreJson) {
  return score.has_replay;
}

export function hasShow(score: SoloScoreJson) {
  return score.best_id != null || score.type === 'solo_score';
}

export function isPerfectCombo(score: SoloScoreJson) {
  return shouldReturnLegacyValue(score)
    ? score.legacy_perfect
    : score.is_perfect_combo;
}

interface AttributeData {
  attribute: SoloScoreStatisticsAttribute;
  label: string;
}

const labelMiss = trans('beatmapsets.show.scoreboard.headers.miss');

export const modeAttributesMap: Record<GameMode, AttributeData[]> = {
  fruits: [
    { attribute: 'great', label: 'fruits' },
    { attribute: 'large_tick_hit', label: 'ticks' },
    { attribute: 'small_tick_miss', label: 'drp miss' },
    { attribute: 'miss', label: labelMiss },
  ],
  mania: [
    { attribute: 'perfect', label: 'max' },
    { attribute: 'great', label: '300' },
    { attribute: 'good', label: '200' },
    { attribute: 'ok', label: '100' },
    { attribute: 'meh', label: '50' },
    { attribute: 'miss', label: labelMiss },
  ],
  osu: [
    { attribute: 'great', label: '300' },
    { attribute: 'ok', label: '100' },
    { attribute: 'meh', label: '50' },
    { attribute: 'miss', label: labelMiss },
  ],
  taiko: [
    { attribute: 'great', label: 'great' },
    { attribute: 'ok', label: 'good' },
    { attribute: 'miss', label: labelMiss },
  ],
};

export function rank(score: SoloScoreJson) {
  return shouldReturnLegacyValue(score)
    ? legacyAccuracyAndRank(score).rank
    : score.rank;
}

export function scoreDownloadUrl(score: SoloScoreJson) {
  if (score.type === 'solo_score') {
    return route('scores.download', { score: score.id });
  }

  if (score.best_id != null) {
    return route('scores.download-legacy', {
      rulesetOrScore: rulesetName(score.ruleset_id),
      score: score.best_id,
    });
  }

  throw new Error('score json doesn\'t have download url');
}

export function scoreUrl(score: SoloScoreJson) {
  if (score.type === 'solo_score') {
    return route('scores.show', { rulesetOrScore: score.id });
  }

  if (score.best_id != null) {
    return route('scores.show', {
      rulesetOrScore: rulesetName(score.ruleset_id),
      score: score.best_id,
    });
  }

  throw new Error('score json doesn\'t have url');
}

function shouldReturnLegacyValue(score: SoloScoreJson) {
  return score.legacy_score_id !== null && core.userPreferences.get('legacy_score_only');
}

export function totalScore(score: SoloScoreJson) {
  return shouldReturnLegacyValue(score)
    ? score.legacy_total_score
    : score.total_score;
}
