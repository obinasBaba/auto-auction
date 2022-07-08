import React from 'react';
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{
  slug: string;
}>) {
  // return {
  //   notFound: true,
  // };

  return {
    props: {
      dashBoard: true,
      pageName: params?.slug,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  const pages = ['profile-setting'];

  return {
    paths: pages.map((page) => ({ params: { slug: page } })),
    fallback: false,
  };
}

const ProfileSetting: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ pageName }) => {
  return (
    <div>
      <h1>PROFILE SETTING PAGE</h1>
      <h1>pageName: {pageName}</h1>
    </div>
  );
};

export default ProfileSetting;
