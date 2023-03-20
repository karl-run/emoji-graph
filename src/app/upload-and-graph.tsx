'use client';

import React, { useState } from 'react';
import FileDropZone from '@/components/FileDropZone';
import { Emoji } from '@/analyse/parse';
import StepIcon from '@/components/StepIcon';
import dynamic from 'next/dynamic';

const EmojiBarChart = dynamic(() => import('@/components/EmojiBarChart'), {
  ssr: false,
});

function UploadAndGraph(): JSX.Element {
  const [data, setData] = useState<Emoji[]>([]);

  console.log(data);

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
      <section className="mt-8" aria-labelledby="step-2-description">
        <h2 id="step-2-description" className="flex items-center text-center">
          <StepIcon>3</StepIcon>
          <span>Share it!</span>
        </h2>
        <p className="pt-4 sm:w-3/4">
          Screenshot the graph below and share it!
        </p>
        <EmojiBarChart emoji={data} />
      </section>
    </div>
  );
}

export default UploadAndGraph;
