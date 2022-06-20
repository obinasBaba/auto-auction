import Head from 'next/head';
import LandingPage from '@/scenes/LandingPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vehicle Auction Website</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPage />
    </>
  );
}
