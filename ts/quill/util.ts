// Copyright 2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import Fuse from 'fuse.js';
import Delta from 'quill-delta';
import { DeltaOperation } from 'quill';

import { ConversationType } from '../state/ducks/conversations';
import { BodyRangeType } from '../types/Util';

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name', 'firstName', 'profileName', 'title'],
};

export const getTextAndMentionsFromOps = (
  ops: Array<DeltaOperation>
): [string, Array<BodyRangeType>] => {
  const mentions: Array<BodyRangeType> = [];

  const text = ops.reduce((acc, { insert }, index) => {
    if (typeof insert === 'string') {
      let textToAdd;
      switch (index) {
        case 0: {
          textToAdd = insert.trimLeft();
          break;
        }
        case ops.length - 1: {
          textToAdd = insert.trimRight();
          break;
        }
        default: {
          textToAdd = insert;
          break;
        }
      }
      return acc + textToAdd;
    }

    if (insert.emoji) {
      return acc + insert.emoji;
    }

    if (insert.mention) {
      mentions.push({
        length: 1, // The length of `\uFFFC`
        mentionUuid: insert.mention.uuid,
        replacementText: insert.mention.title,
        start: acc.length,
      });

      return `${acc}\uFFFC`;
    }

    return acc;
  }, '');

  return [text, mentions];
};

export const getDeltaToRemoveStaleMentions = (
  ops: Array<DeltaOperation>,
  memberUuids: Array<string>
): Delta => {
  const newOps = ops.reduce((memo, op) => {
    if (op.insert) {
      if (op.insert.mention && !memberUuids.includes(op.insert.mention.uuid)) {
        const deleteOp = { delete: 1 };
        const textOp = { insert: `@${op.insert.mention.title}` };
        return [...memo, deleteOp, textOp];
      }

      if (typeof op.insert === 'string') {
        const retainStringOp = { retain: op.insert.length };
        return [...memo, retainStringOp];
      }

      const retainEmbedOp = { retain: 1 };
      return [...memo, retainEmbedOp];
    }

    return [...memo, op];
  }, Array<DeltaOperation>());

  return new Delta(newOps);
};

export class MemberRepository {
  private members: Array<ConversationType>;

  private fuse: Fuse<ConversationType>;

  constructor(members: Array<ConversationType> = []) {
    this.members = members;
    this.fuse = new Fuse<ConversationType>(this.members, FUSE_OPTIONS);
  }

  updateMembers(members: Array<ConversationType>): void {
    this.members = members;
    this.fuse = new Fuse(members, FUSE_OPTIONS);
  }

  getMembers(omit?: ConversationType): Array<ConversationType> {
    if (omit) {
      return this.members.filter(({ id }) => id !== omit.id);
    }

    return this.members;
  }

  getMemberById(id?: string): ConversationType | undefined {
    return id
      ? this.members.find(({ id: memberId }) => memberId === id)
      : undefined;
  }

  getMemberByUuid(uuid?: string): ConversationType | undefined {
    return uuid
      ? this.members.find(({ uuid: memberUuid }) => memberUuid === uuid)
      : undefined;
  }

  search(pattern: string, omit?: ConversationType): Array<ConversationType> {
    const results = this.fuse.search(pattern);

    if (omit) {
      return results.filter(({ id }) => id !== omit.id);
    }

    return results;
  }
}