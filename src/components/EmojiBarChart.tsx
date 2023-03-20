'use client';

import React from 'react';
import * as R from 'remeda';
import { Bar, BarDatum } from '@nivo/bar';
import { Emoji } from '@/analyse/parse';
import { getTop } from '@/analyse/emojis';
import { useWindowSize } from '@/utils/useWindowSize';

const exampleData: { name: string; emojis: number }[] = [
  { name: 'Wynny Dixey', emojis: 54 },
  { name: 'Hilliary Tomaini', emojis: 60 },
  { name: 'Nomi Ranscome', emojis: 66 },
  { name: 'Aimee Lamba', emojis: 68 },
  { name: 'Sherye Haeslier', emojis: 71 },
  { name: 'Amitie Turfitt', emojis: 90 },
  { name: 'Rosabelle Adlem', emojis: 187 },
  { name: 'Johnath Stenning', emojis: 269 },
  { name: 'Shermie Weinham', emojis: 362 },
  { name: 'Ursulina Schorah', emojis: 456 },
];

function EmojiBarChart({ emoji }: { emoji: Emoji[] }): JSX.Element {
  const windowSize = useWindowSize();
  const multiplier = windowSize.width < 768 ? 0.9 : 0.69;
  const data = emoji.length == 0 ? exampleData : mapToTop10(emoji);
  const longestName = R.maxBy(data, (it) => it.name.length);

  return (
    <div className="w-full overflow-auto">
      <Bar
        indexBy="name"
        keys={['emojis']}
        groupMode="grouped"
        layout="horizontal"
        tooltip={() => null}
        width={Math.min(windowSize.width * multiplier, 900)}
        height={400}
        margin={{
          top: 0,
          right: 0,
          bottom: 30,
          left: (longestName?.name.length ?? 1) * 6.5,
        }}
        data={data}
        padding={0.2}
        labelTextColor={'inherit:darker(1.4)'}
        labelSkipWidth={16}
        labelSkipHeight={16}
        enableGridY={false}
        enableGridX
      />
    </div>
  );
}

function mapToTop10(emoji: Emoji[]): { name: string; emojis: number }[] {
  return R.pipe(
    getTop(emoji, 100),
    R.map(([key, count]) => ({ name: key, emojis: count })),
  );
}

export default EmojiBarChart;
