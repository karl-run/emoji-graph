'use client';

import React, { PropsWithChildren } from 'react';
import * as R from 'remeda';
import { ResponsiveBar } from '@nivo/bar';

import { Emoji } from '@/analyse/parse';
import { getTop } from '@/analyse/emojis';
import { cn } from '@/utils/cn';

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

function EmojiBarChart({
  emoji,
  children,
  top = 10,
}: PropsWithChildren<{ emoji: Emoji[]; top?: number }>): JSX.Element {
  const data =
    emoji.length == 0 ? exampleData.slice(0, top) : mapToTop(emoji, top);
  const longestName = R.maxBy(data, (it) => it.name.length);

  return (
    <div className="my-8 w-full max-w-4xl">
      {children}
      <div
        className={cn('h-96 w-full', {
          'h-[40rem]': top === 30,
          'h-[32rem]': top === 20,
          'h-[12rem]': top === 3,
        })}
      >
        <ResponsiveBar
          indexBy="name"
          keys={['emojis']}
          groupMode="grouped"
          layout="horizontal"
          colors={['#5aae61']}
          tooltip={() => null}
          margin={{
            top: 0,
            right: 0,
            bottom: 30,
            left: (longestName?.name.length ?? 1) * 7,
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
    </div>
  );
}

function mapToTop(
  emoji: Emoji[],
  top: number,
): { name: string; emojis: number }[] {
  return R.pipe(
    getTop(emoji, top),
    R.map(([key, count]) => ({ name: key, emojis: count })),
  );
}

export default EmojiBarChart;
