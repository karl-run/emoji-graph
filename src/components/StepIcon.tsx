import React, { PropsWithChildren } from 'react';

function StepIcon({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="align-center mr-4 flex h-8 w-8 justify-center rounded-full border-2 border-slate-400 border-green-600 text-xl font-bold text-slate-600">
      {children}
    </div>
  );
}

export default StepIcon;
