import React from 'react';
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { data } from './index';
import s from './profile.module.scss';
import { Avatar, Box, Skeleton } from '@mui/material';

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
    <div className={s.slug}>
      <div className="wrapper">
        <div>
          <Skeleton width="100%" />
          <Skeleton
            sx={{ borderRadius: '10px' }}
            variant="rectangular"
            height={218}
            animation="wave"
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton width="60%" animation="wave" />
          </Box>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </div>

        <div>
          <Skeleton width="100%" />
          <Skeleton
            sx={{ borderRadius: '10px' }}
            variant="rectangular"
            height={218}
            animation="wave"
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton width="60%" />
          </Box>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </div>

        <div>
          <Skeleton width="100%" />
          <Skeleton
            sx={{ borderRadius: '10px' }}
            variant="rectangular"
            height={218}
            animation="wave"
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton width="60%" />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
