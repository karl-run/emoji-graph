import React, { useEffect } from 'react';

import { cn } from '@/utils/cn';

interface Props {
  extremities: [Date, Date];
  onSizeChange: (size: number) => void;
  onStartChange: (start: Date | null) => void;
  onEndChange: (end: Date | null) => void;
}

function Controls({
  extremities: [first, last],
  onSizeChange,
  onStartChange,
  onEndChange,
}: Props): JSX.Element {
  const startRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLInputElement>(null);
  const [startValue, setStartValue] = React.useState<string>(
    first.toISOString().slice(0, 10),
  );
  const [endValue, setEndValue] = React.useState<string>(
    last.toISOString().slice(0, 10),
  );

  const firstDate = first.toISOString().slice(0, 10);
  const lastDate = last.toISOString().slice(0, 10);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative w-min rounded bg-slate-100 p-4">
        <fieldset className="flex gap-4">
          <legend className="mb-2">Legend</legend>
          <input
            ref={startRef}
            className={cn('rounded border-2 p-2', {
              'border-dotted border-blue-400 focus-visible:border-blue-400':
                startValue !== firstDate,
            })}
            type="date"
            id="start"
            name="time-start"
            defaultValue={firstDate}
            min={firstDate}
            max={lastDate}
            onChange={(event) => {
              setStartValue(event.currentTarget.value);
              onStartChange(new Date(event.currentTarget.value));
            }}
          />

          <input
            ref={endRef}
            className={cn('rounded border-2 p-2', {
              'border-dotted border-blue-400 focus-visible:border-blue-400':
                endValue !== lastDate,
            })}
            type="date"
            id="start"
            name="time-end"
            defaultValue={lastDate}
            min={firstDate}
            max={lastDate}
            onChange={(event) => {
              setEndValue(event.currentTarget.value);
              onEndChange(new Date(event.currentTarget.value));
            }}
          />
        </fieldset>
        <button
          className="absolute top-4 right-4 underline"
          onClick={() => {
            if (startRef.current) {
              startRef.current.value = firstDate;
              setStartValue(firstDate);
              onStartChange(null);
            }
            if (endRef.current) {
              endRef.current.value = lastDate;
              setEndValue(lastDate);
              onEndChange(null);
            }
          }}
        >
          Reset
        </button>
      </div>
      <div className="flex w-min w-48 max-w-xs flex-col rounded bg-slate-100 p-4">
        <label className="mb-2" htmlFor="graph-size-select">
          Graph size
        </label>
        <select
          name="graph-size-select"
          id="graph-size-select"
          className="rounded border-2 bg-white p-2.5"
          defaultValue="10"
          onChange={(event) => {
            onSizeChange(+event.currentTarget.value);
          }}
        >
          <option value="3">Top 3</option>
          <option value="10">Top 10</option>
          <option value="15">Top 15</option>
          <option value="20">Top 20</option>
          <option value="30">Top 30</option>
        </select>
      </div>
    </div>
  );
}

export default Controls;
