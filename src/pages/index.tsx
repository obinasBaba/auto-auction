import Head from 'next/head';
import LandingPage from '@/scenes/LandingPage';
import { useEffect } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export async function getStaticProps({}: GetStaticPropsContext<{
  slug: string;
}>) {
  // return {
  //   notFound: true,
  // };
  const acc = 'await prisma.user.findMany();';
  return {
    props: {
      acc,
    },
    revalidate: 200,
  };
}

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // const { openModal, closeModal } = useUI();

  useEffect(() => {
    console.log('props: ', props.acc);
  }, []);

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
