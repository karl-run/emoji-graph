'use client';

import React, { useState } from 'react';
import FileDropZone from '@/components/FileDropZone';
import EmojiBarChart from '@/components/EmojiBarChart';
import { Emoji } from '@/analyse/parse';

function UploadAndGraph(): JSX.Element {
  const [data, setData] = useState<Emoji[]>([]);

  return (
    <div>
      <FileDropZone onFileLoad={setData} />
      <EmojiBarChart emoji={data} />
    </div>
  );
}

export default UploadAndGraph;
