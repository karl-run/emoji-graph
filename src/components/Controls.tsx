import React from 'react';

interface Props {
  extremities: [Date, Date];
  onSizeChange: (size: number) => void;
}

function Controls({ extremities, onSizeChange }: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-16 max-w-xs flex-col">
        <label className="mb-2" htmlFor="graph-size-select">
          Graph size
        </label>
        <select
          name="graph-size-select"
          id="graph-size-select"
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
