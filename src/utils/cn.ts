import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Wrapper for clsx that de-duplicates and merges tailwind classes
 */
export const cn: typeof clsx = (...args) => {
  return twMerge(clsx(...args));
};
