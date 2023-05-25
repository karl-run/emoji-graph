import React from 'react';
import * as R from 'remeda';

import { Emoji } from '@/analyse/parse';
import { getTop } from '@/analyse/emojis';

interface Props {
  emoji: Emoji[];
  size: number;
  start: Date;
  end: Date;
}

function AccessibleTextSummary({
  emoji,
  size,
  start,
  end,
}: Props): JSX.Element {
  const startTs = start.getTime() / 1000;
  const endTs = end.getTime() / 1000;

  const top = R.pipe(
    emoji,
    R.filter((it) => it.created >= startTs && it.created <= endTs),
    (it) => getTop(it, size),
  );

  return (
    <>
      <details>
        <summary>Accessible text for screenshots</summary>
        <h4>Title:</h4>
        <pre className="border p-1">
          Top {size} emoji uploaders between {start.toLocaleDateString()} and{' '}
          {end.toLocaleDateString()}
        </pre>
        <h4>Description:</h4>
        <pre className="border p-1">
          {R.reverse(top)
            .map(([name, count]) => `${name}: ${count}`)
            .join('\n')}
        </pre>
      </details>
      <details>
        <summary>Fun stats</summary>
        <dl>
          <dt>Total emojis</dt>
          <dd>{emoji.length}</dd>
          <dt>Unqiue uploaders</dt>
          <dd>{R.uniqBy(emoji, (it) => it.user_id).length}</dd>
          <dt>Uploaders with more than 10</dt>
          <dd>
            {
              R.pipe(
                emoji,
                R.groupBy(R.prop('user_id')),
                R.toPairs,
                R.filter(([_, it]) => it.length > 10),
              ).length
            }
          </dd>
        </dl>
      </details>
    </>
  );
}

export default AccessibleTextSummary;
