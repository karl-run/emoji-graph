'use client';

import React from 'react';
import * as R from 'remeda';
import { Bar, BarDatum } from '@nivo/bar';
import { Emoji } from '@/analyse/parse';
import { getTop } from '@/analyse/emojis';

const exampleData: BarDatum[] = [
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
  return (
    <Bar
      indexBy="name"
      keys={['emojis']}
      groupMode="grouped"
      layout="horizontal"
      tooltip={() => null}
      width={900}
      height={500}
      margin={{ top: 60, right: 110, bottom: 60, left: 170 }}
      data={emoji.length == 0 ? exampleData : mapToTop10(emoji)}
      padding={0.2}
      labelTextColor={'inherit:darker(1.4)'}
      labelSkipWidth={16}
      labelSkipHeight={16}
      enableGridY={false}
      enableGridX
    />
  );
}

function mapToTop10(emoji: Emoji[]): BarDatum[] {
  return R.pipe(
    getTop(emoji, 10),
    R.map(([key, count]) => ({ name: key, emojis: count })),
  );
}

export default EmojiBarChart;
