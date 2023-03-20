import * as R from 'remeda';

import { Emoji } from '@/analyse/parse';

export function getTop(emojis: Emoji[], count = 10): [string, number][] {
  const userLookup = R.pipe(
    emojis,
    R.uniqBy(R.prop('user_id')),
    R.map((it): [string, string] => [it.user_id, it.user_display_name]),
    (it) => R.fromPairs(it),
  );

  return R.pipe(
    emojis,
    R.groupBy(R.prop('user_id')),
    R.toPairs,
    R.sortBy((it) => it[1].length),
    (it) => it.slice(-count),
    R.map(([id, emojis]) => [userLookup[id], emojis.length]),
  );
}
