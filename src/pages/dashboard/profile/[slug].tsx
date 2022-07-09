import React from 'react';
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { data } from './index';

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{
  slug: string;
}>) {
  console.time('static-start');

  const activePageData = data.find(({ link }) => params?.slug === link);
  if (!activePageData)
    return {
      notFound: true,
    };

  console.timeEnd('static-start');

  return {
    props: {
      dashBoard: true,
      pageName: params?.slug,
      headerInfo: {
        title: activePageData.title,
        subTitle: activePageData.subTitle,
      },
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  console.time('path-start');
  const paths = data.map(({ link }) => ({ params: { slug: link } }));
  console.timeEnd('path-start');
  return {
    paths,
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
