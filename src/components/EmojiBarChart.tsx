import { PropsWithChildren } from 'react';
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
  return (
    <div className="chart">
      {children}
      <div
        className={cn('chart__visual', {
          'chart__visual--top-30': top === 30,
          'chart__visual--top-20': top === 20,
          'chart__visual--top-3': top === 3,
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
        <div className="chart__animation-date">
          {animationDate?.toLocaleDateString()}
        </div>
      )}
      <p className="chart__totals">
        <span className="chart__totals-count">
          {filteredEmojis.length} emojis in total
        </span>
      </p>
      <div className="chart__controls">
        <button
          type="button"
          className="chart__toggle"
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
        <div className="chart__progress">
          <div className="chart__progress-track" aria-hidden />
          <div
            className="chart__progress-fill"
            aria-hidden
            style={{
              width:
                timeLeft === 0
                  ? '0%'
                  : `${((RUNTIME - timeLeft) / RUNTIME) * 100}%`,
            }}
          />
          {timeLeft !== 0 && (
            <div className="chart__progress-time">
              {Math.floor(timeLeft / 1000)}s
            </div>
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
