import React from 'react';
import * as R from 'remeda';

import { Emoji } from '@/analyse/parse';
import { getTop } from '@/analyse/emojis';

interface Props {
  emoji: Emoji[];
  size: number;
  extremities: [start: Date, end: Date];
}

function AccessibleTextSummary({
  emoji,
  size,
  extremities,
}: Props): JSX.Element {
  const top = getTop(emoji, size);
  return (
    <details>
      <summary>Accesible text for screenshots</summary>
      <h4>Title:</h4>
      <pre className="border p-1">
        Top {size} emoji uploaders between {extremities[0].toLocaleDateString()}{' '}
        and {extremities[1].toLocaleDateString()}
      </pre>
      <h4>Description:</h4>
      <pre className="border p-1">
        {R.reverse(top)
          .map(([name, count]) => `${name}: ${count}`)
          .join('\n')}
      </pre>
    </details>
  );
}

export default AccessibleTextSummary;
