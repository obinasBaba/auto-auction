import Head from 'next/head';
import LandingPage from '@/scenes/LandingPage';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 200,
  };
}

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
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
