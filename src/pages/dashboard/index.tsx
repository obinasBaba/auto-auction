import React from 'react';
import { Typography } from '@mui/material';
import { GetStaticPropsContext } from 'next';

export async function getStaticProps({}: GetStaticPropsContext<{
  slug: string;
}>) {
  // return {
  //   notFound: true,
  // };

  return {
    props: {
      dashBoard: true,
    },
    revalidate: 200,
  };
}

const DashBoard = () => {
  return (
    <div>
      <Typography variant="h1">DashBoard Content</Typography>
    </div>
  );
};

export default DashBoard;
