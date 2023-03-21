import { Emoji } from '@/analyse/parse';

export function dateExtremities(emoji: Emoji[]): [start: Date, end: Date] {
  if (emoji.length === 0) {
    return [new Date(2021, 2, 3), new Date(2023, 3, 20)];
  }

  const dates = emoji.map((e) => e.created);
  const min = Math.min(...dates);
  const max = Math.max(...dates);
  return [new Date(min * 1000), new Date(max * 1000)];
}
