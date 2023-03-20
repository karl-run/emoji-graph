import './globals.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emoji Top 10 Generator',
  description:
    'Create a fun graph for your slack workspace of the top 10 emoji uploaders in your workspace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
