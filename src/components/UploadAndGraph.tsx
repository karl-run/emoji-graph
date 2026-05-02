import { Suspense, lazy, useState } from 'react';

import { Emoji } from '@/analyse/parse';
import AccessibleTextSummary from '@/components/AccessibleTextSummary';
import Controls from '@/components/Controls';
import FileDropZone from '@/components/FileDropZone';
import StepIcon from '@/components/StepIcon';
import { dateExtremities } from '@/utils/emoji';

const EmojiBarChart = lazy(() => import('@/components/EmojiBarChart'));

function UploadAndGraph(): JSX.Element {
  const [data, setData] = useState<Emoji[]>([]);
  const [size, setSize] = useState(10);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const extremities = dateExtremities(data);

  return (
    <div>
      <section className="section-block" aria-labelledby="step-2-description">
        <h2 id="step-2-description" className="section-title">
          <StepIcon>2</StepIcon>
          <span>Crunch the data!</span>
        </h2>
        <p className="copy-block">
          Simply drag (or click and select) the file you downloaded. The file
          never leaves your computer, and is only used to create the graph you
          see below in your browser.
        </p>
        <FileDropZone onFileLoad={setData} />
      </section>

      <section className="section-block" aria-labelledby="step-3-description">
        <h2
          id="step-3-description"
          className="section-title section-title--spaced"
        >
          <StepIcon>3</StepIcon>
          <span>Tweak it! (Optional)</span>
        </h2>
        <Controls
          key={extremities.map((it) => it.toISOString()).join('-')}
          extremities={extremities}
          onSizeChange={setSize}
          onStartChange={(date) => setStart(date)}
          onEndChange={(date) => setEnd(date)}
        />
      </section>

      <section className="section-block" aria-labelledby="step-4-description">
        <h2 id="step-4-description" className="section-title">
          <StepIcon>4</StepIcon>
          <span>Share it!</span>
        </h2>
        <p className="copy-block">Screenshot the graph below and share it!</p>
        <AccessibleTextSummary
          emoji={data}
          size={size}
          start={start ?? extremities[0]}
          end={end ?? extremities[1]}
        />
        <Suspense fallback={<p className="chart-loading">Loading chart…</p>}>
          <EmojiBarChart
            emoji={data}
            top={size}
            limits={{
              start: start ?? extremities[0],
              end: end ?? extremities[1],
            }}
          >
            <h3 className="chart-title">
              Top {size} emoji uploaders between{' '}
              <span className="text-strong">
                {(start ?? extremities[0]).toLocaleDateString()}{' '}
              </span>
              and{' '}
              <span className="text-strong">
                {(end ?? extremities[1]).toLocaleDateString()}
              </span>
            </h3>
          </EmojiBarChart>
        </Suspense>
      </section>
    </div>
  );
}

export default UploadAndGraph;
