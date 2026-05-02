import React from 'react';

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
    <div className="controls">
      <div className="control-card">
        <fieldset className="control-fieldset">
          <legend className="control-legend">Date range</legend>
          <input
            ref={startRef}
            className={cn('control-input', {
              'control-input--changed': startValue !== firstDate,
            })}
            type="date"
            id="start-date"
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
            className={cn('control-input', {
              'control-input--changed': endValue !== lastDate,
            })}
            type="date"
            id="end-date"
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
          type="button"
          className="control-reset"
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
      <div className="control-card control-card--compact">
        <label className="control-label" htmlFor="graph-size-select">
          Graph size
        </label>
        <select
          name="graph-size-select"
          id="graph-size-select"
          className="control-select"
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
