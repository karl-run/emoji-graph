import { PropsWithChildren } from 'react';

function StepIcon({ children }: PropsWithChildren): JSX.Element {
  return <div className="step-icon">{children}</div>;
}

export default StepIcon;
