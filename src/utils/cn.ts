import clsx from 'clsx';

/**
 * Wrapper for clsx used for conditional class names
 */
export const cn: typeof clsx = (...args) => {
  return clsx(...args);
};
