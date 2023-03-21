'use client';

import React, { PropsWithChildren } from 'react';
import * as R from 'remeda';
import { ResponsiveBar } from '@nivo/bar';

import { Emoji } from '@/analyse/parse';
import { getTop } from '@/analyse/emojis';
import { cn } from '@/utils/cn';

type ChartData = { name: string; emojis: number }[];

type Props = {
  emoji: Emoji[];
  top?: number;
  limits: { start: Date | null; end: Date | null };
};

function EmojiBarChart({
  emoji,
  children,
  limits,
  top = 10,
}: PropsWithChildren<Props>): JSX.Element {
  const [data, filteredEmojis] = useData({ emoji, limits, top });
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
      <p className="text-center text-xs">
        {filteredEmojis.length} emojis in total
      </p>
    </div>
  );
}

function mapToTop(emoji: Emoji[], top: number): ChartData {
  return R.pipe(
    getTop(emoji, top),
    R.map(([key, count]) => ({ name: key, emojis: count })),
  );
}

type UseDataOptions = Pick<Props, 'emoji' | 'limits'> & { top: number };

function useData({ emoji, top, limits }: UseDataOptions): [ChartData, Emoji[]] {
  if (emoji.length === 0) {
    return [exampleData.slice(0, top), []];
  }

  const filterByStart = (emoji: Emoji[]) => {
    if (limits.start) {
      const tsLimit = limits.start.getTime() / 1000;
      return R.filter(emoji, (it) => it.created >= tsLimit);
    } else {
      return emoji;
    }
  };

  const filterByEnd = (emoji: Emoji[]) => {
    if (limits.end) {
      const tsLimit = limits.end.getTime() / 1000;
      return R.filter(emoji, (it) => it.created <= tsLimit);
    } else {
      return emoji;
    }
  };

  const filteredEmoji = R.pipe(emoji, filterByStart, filterByEnd);

  return [mapToTop(filteredEmoji, top), filteredEmoji];
}

const exampleData: ChartData = [
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

export default EmojiBarChart;
