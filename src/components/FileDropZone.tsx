'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/utils/cn';
import { Emoji, readDroppedFile } from '@/analyse/parse';

interface Props {
  onFileLoad: (emoji: Emoji[]) => void;
}

function FileDropZone({ onFileLoad }: Props): JSX.Element {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const [first] = acceptedFiles;

      const result = await readDroppedFile(first);

      if (Array.isArray(result)) {
        onFileLoad(result);
      } else {
        // TODO error handling
        console.error(result);
      }
    },
    [onFileLoad],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log('isDragActive: ', isDragActive);

  return (
    <div className="m-8">
      <div
        {...getRootProps()}
        className={cn(
          'border-dashed border-2 w-64 h-32 rounded flex justify-center items-center text-slate-700',
          {
            'border-blue-500': isDragActive,
          },
        )}
      >
        <input {...getInputProps()} />
        <svg
          className="h-8 mr-2"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"
          ></path>
        </svg>

        <span className="block text-grey">Drop your files here</span>
      </div>
    </div>
  );
}

export default FileDropZone;
