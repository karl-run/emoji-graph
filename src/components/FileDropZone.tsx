'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/utils/cn';
import { Emoji, readDroppedFile } from '@/analyse/parse';

interface Props {
  onFileLoad: (emoji: Emoji[]) => void;
}

function FileDropZone({ onFileLoad }: Props): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const [first] = acceptedFiles;

      try {
        const result = await readDroppedFile(first);

        if (Array.isArray(result)) {
          onFileLoad(result);
        } else {
          console.error(result);
          setError(result.message);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          setError(e.message);
        } else {
          console.error(e);
          setError(
            'Something very strange has happened. 🤔 Not sure what to think about this file!',
          );
        }
      }
    },
    [onFileLoad],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="mt-8">
      <div
        {...getRootProps()}
        className={cn(
          'flex h-32 w-full items-center justify-center rounded border-2 border-dashed text-slate-700 hover:border-blue-300 sm:ml-16 sm:w-1/2',
          {
            'border-blue-500': isDragActive,
          },
        )}
      >
        <input {...getInputProps()} />
        <svg
          className="mr-2 h-8"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"
          ></path>
        </svg>

        <span className="text-grey block">Drop your files here</span>
      </div>
      {error && (
        <p className="mt-4 w-full text-red-600 sm:ml-16 sm:w-1/2">{error}</p>
      )}
    </div>
  );
}

export default FileDropZone;
