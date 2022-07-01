import React from 'react';
import s from './auction.module.scss';
import { GetStaticPropsContext } from 'next';

const Auction = () => {
  return (
    <div className={s.container}>
      <h1>Auction Content</h1>
    </div>
  );
};

export default Auction;
