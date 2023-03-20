import { Inter } from 'next/font/google';
import UploadAndGraph from '@/app/upload-and-graph';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  return (
    <main className="p-8">
      <UploadAndGraph />
    </main>
  );
}
