'use client';

import React, { PropsWithChildren } from 'react';
import * as R from 'remeda';
import { ResponsiveBar } from '@nivo/bar';
import useCountDown from 'react-countdown-hook';

import { Emoji } from '@/analyse/parse';
import { getTop } from '@/analyse/emojis';
import { cn } from '@/utils/cn';

type ChartData = { name: string; emojis: number }[];

type Props = {
  emoji: Emoji[];
  top?: number;
  limits: { start: Date; end: Date };
};

const RUNTIME = 60 * 1000;

function EmojiBarChart({
  emoji,
  children,
  limits,
  top = 10,
}: PropsWithChildren<Props>): JSX.Element {
  const [timeLeft, { start, reset }] = useCountDown(RUNTIME, 64);
  const [data, filteredEmojis, animationDate] = useData({
    emoji,
    limits,
    top,
    timeLeft,
  });
  const longestName = R.maxBy(data, (it) => it.name.length);

  return (
    <div className="relative my-8 w-full max-w-4xl">
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
          axisLeft={{
            format: (value) =>
              value.length > 22 ? `${value.slice(0, 20)}…` : value,
          }}
          margin={{
            top: 4,
            right: 4,
            bottom: 30,
            left: 140,
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
      {timeLeft !== 0 && animationDate != null && (
        <div className="absolute left-4 bottom-16 w-20 text-lg font-bold">
          {animationDate?.toLocaleDateString()}
        </div>
      )}
      <p className="text-center text-xs">
        <span className="inline-block w-32 text-right">
          {filteredEmojis.length} emojis in total
        </span>
      </p>
      <div className="mt-4 flex items-center">
        <button
          className="mr-4 h-8 w-8 rounded-full bg-blue-300 hover:bg-blue-100 focus:bg-blue-100"
          onClick={() => {
            if (timeLeft === 0) {
              start();
            } else {
              reset();
            }
          }}
        >
          ⏯
        </button>
        <div className="relative w-full">
          <div className="absolute h-1 w-full bg-slate-300" aria-hidden />
          <div
            className="absolute h-1 w-full bg-blue-300"
            aria-hidden
            style={{
              width:
                timeLeft === 0
                  ? '0%'
                  : `${((RUNTIME - timeLeft) / RUNTIME) * 100}%`,
            }}
          />
          {timeLeft !== 0 && (
            <div className="absolute top-2">{Math.floor(timeLeft / 1000)}s</div>
          )}
        </div>
      </div>
    </div>
  );
}

function mapToTop(emoji: Emoji[], top: number): ChartData {
  return R.pipe(
    getTop(emoji, top),
    R.map(([key, count]) => ({ name: key, emojis: count })),
  );
}

type UseDataOptions = Pick<Props, 'emoji' | 'limits'> & {
  top: number;
  timeLeft: number;
};

function useData({
  emoji,
  top,
  limits,
  timeLeft,
}: UseDataOptions): [ChartData, Emoji[], Date | null] {
  const diff = (limits.end.getTime() - limits.start.getTime()) / 1000;
  const tsStart = limits.start.getTime() / 1000;
  const percentComplete = (RUNTIME - timeLeft) / RUNTIME;

  if (emoji.length === 0) {
    return [exampleData.slice(0, top), [], null];
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
    if (timeLeft !== 0) {
      return R.filter(
        emoji,
        (it) => it.created <= tsStart + diff * percentComplete,
      );
    }

    if (limits.end) {
      const tsLimit = limits.end.getTime() / 1000;
      return R.filter(emoji, (it) => it.created <= tsLimit);
    } else {
      return emoji;
    }
  };

  const filteredEmoji = R.pipe(emoji, filterByStart, filterByEnd);

  return [
    mapToTop(filteredEmoji, top),
    filteredEmoji,
    timeLeft !== 0
      ? new Date((tsStart + diff * percentComplete) * 1000)
      : limits.end,
  ];
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
