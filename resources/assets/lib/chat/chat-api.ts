// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

import AckResponseJson from 'interfaces/chat/ack-response-json';
import ChannelJson from 'interfaces/chat/channel-json';
import ChatUpdatesJson from 'interfaces/chat/chat-updates-json';
import MessageJson from 'interfaces/chat/message-json';
import UserJson from 'interfaces/user-json';
import { route } from 'laroute';
import { runInAction } from 'mobx';
import Message from 'models/chat/message';
import core from 'osu-core-singleton';

interface GetMessagesResponse {
  messages: MessageJson[];
  users: UserJson[];
}

interface NewConversationJson {
  channel: ChannelJson;
  message: MessageJson;
  new_channel_id: number;
}

export function ack() {
  return $.post(route('chat.ack')) as JQuery.jqXHR<AckResponseJson>;
}

export function getMessages(channelId: number, params?: { until?: number }) {
  const request = $.get(route('chat.channels.messages.index', { channel: channelId, return_object: 1, ...params })) as JQuery.jqXHR<GetMessagesResponse>;
  request.done((response) => {
    runInAction(() => core.dataStore.userStore.updateWithJson(response.users));
  });

  return request;
}

export function getUpdates(since: number, summary: boolean, lastHistoryId?: number | null) {
  return $.get(
    route('chat.updates'),
    {
      history_since: lastHistoryId,
      includes: { messages: 0, presence: 1, silences: 1 },
      since,
    },
  ) as JQuery.jqXHR<ChatUpdatesJson | null>;
}

export function markAsRead(channelId: number, messageId: number) {
  return $.ajax({
    type: 'PUT',
    url: route('chat.channels.mark-as-read', {channel: channelId, message: messageId}),
  }) as JQuery.jqXHR<void>;
}

export function newConversation(userId: number, message: Message) {
  return $.post(route('chat.new'), {
    is_action: message.isAction,
    message: message.content,
    target_id: userId,
    uuid: message.uuid,
  }) as JQuery.jqXHR<NewConversationJson>;
}

export function partChannel(channelId: number, userId: number) {
  return $.ajax(route('chat.channels.part', {
    channel: channelId,
    user: userId,
  }), {
    method: 'DELETE',
  }) as JQuery.jqXHR<void>;
}

export function sendMessage(message: Message) {
  return $.post(route('chat.channels.messages.store', { channel: message.channelId }), {
    is_action: message.isAction,
    message: message.content,
    target_id: message.channelId,
    target_type: 'channel',
    uuid: message.uuid,
  }) as JQuery.jqXHR<MessageJson>;
}
