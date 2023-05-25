'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import FileDropZone from '@/components/FileDropZone';
import { Emoji } from '@/analyse/parse';
import StepIcon from '@/components/StepIcon';
import Controls from '@/components/Controls';
import { dateExtremities } from '@/utils/emoji';
import AccessibleTextSummary from '@/components/AccessibleTextSummary';

const EmojiBarChart = dynamic(() => import('@/components/EmojiBarChart'), {
  ssr: false,
});

function UploadAndGraph(): JSX.Element {
  const [data, setData] = useState<Emoji[]>([]);
  const [size, setSize] = useState(10);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const extremities = dateExtremities(data);

  return (
    <div>
      <section className="mt-8" aria-labelledby="step-2-description">
        <h2 id="step-2-description" className="flex items-center text-center">
          <StepIcon>2</StepIcon>
          <span>Crunch the data!</span>
        </h2>
        <p className="pt-4 sm:w-3/4">
          Simply drag (or click and select) the file you downloaded. The file
          never leaves your computer, and is only used to create the graph you
          see below in your browser.
        </p>
        <FileDropZone onFileLoad={setData} />
      </section>
      <section className="mt-8">
        <h2
          id="step-2-description"
          className="mb-4 flex items-center text-center"
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
      <section className="mt-8" aria-labelledby="step-2-description">
        <h2 id="step-2-description" className="flex items-center text-center">
          <StepIcon>4</StepIcon>
          <span>Share it!</span>
        </h2>
        <p className="pt-4 sm:w-3/4">
          Screenshot the graph below and share it!
        </p>
        <AccessibleTextSummary
          emoji={data}
          size={size}
          extremities={extremities}
        />
        <EmojiBarChart
          emoji={data}
          top={size}
          limits={{
            start: start ?? extremities[0],
            end: end ?? extremities[1],
          }}
        >
          <h3 className="mt-4 text-center">
            Top {size} emoji uploaders between{' '}
            <span className="font-bold">
              {start == null
                ? extremities[0].toLocaleDateString()
                : start.toLocaleDateString()}{' '}
            </span>
            and{' '}
            <span className="font-bold">
              {end == null
                ? extremities[1].toLocaleDateString()
                : end.toLocaleDateString()}
            </span>
          </h3>
        </EmojiBarChart>
      </section>
    </div>
  );
}

export default UploadAndGraph;
