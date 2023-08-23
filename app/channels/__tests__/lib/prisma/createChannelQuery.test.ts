import { describe, test, expect } from 'vitest';
import {
  createWhereQuery,
  createWhereQueryJoinTagging,
} from '@/channels/_lib/prisma/createChannelQuery';

describe('createChannelQuery Unit TEST', () => {
  test('クエリパラメータが何も指定されていない時は、プロパティに空のオブジェクトが入ったQueryオブジェクトになる', () => {});
  test('ソート順を指定するクエリパラメータがある時、指定通りにソートのプロパティが設定されているか', () => {});
  test('指定年のクエリパラメータがある時、指定年の開始日が1月1日で終了日が12月31日になっているか', () => {});
  test('プレイスタイル:contentのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {});
  test('プレイスタイル:playのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {});
  test('プレイスタイル:timezoneのクエリパラメータがある時、PrismaでINNER JOINをし、OR文になっているか', () => {});
});
