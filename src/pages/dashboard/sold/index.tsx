import React, { useEffect, useState } from 'react';
import s from './sold.module.scss';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';

const SOLD = gql`
  query ScheduledList($myAuctionListId: ID!, $input: AuctionFilterInput) {
    myAuctionList(id: $myAuctionListId, input: $input) {
      id
      title
      startingDate
      description
      startingBid
      duration
      createdAt
      itemDetail {
        id
        vin
        bodyType
        make
        model
        name
        description
        mileage
        year
        condition
        transmission
        interiorColor
        exteriorColor
        engine
        driveSide
        fuel
        features
        drivetrain
        cylinders
        title
        retailPrice
        defaultImage {
          id
          url
        }
      }

      images {
        id
        url
        name
      }
    }
  }
`;

const SoldPage = () => {
  const [soldCars, setSoldCars] = useState<any[]>([]);
  const { currentUser } = useAppContext();

  const { data, loading, error, refetch } = useQuery(SOLD, {
    initialFetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    skip: !currentUser?.id,
    displayName: 'soldCars',
    variables: {
      input: {
        status: ['ended'],
      },
      myAuctionListId: currentUser?.id,
    },
  });

  useError(error, data);

  useEffect(() => {
    console.log('sold cars--: ', data);
    if (data) {
      setSoldCars(data.myAuctionList);
    }
  }, [data, loading]);

  return (
    <div className={s.container}>
      <h1> your sold cars</h1>

      {soldCars.length ? (
        <div className="list">
          {soldCars.map(
            (
              {
                id,
                title,
                itemDetail: {
                  name,
                  make,
                  bodyType,
                  engine,
                  retailPrice,
                  year,
                  defaultImage: { url, name: imgName },
                },
              },
              idx,
            ) => (
              <div className="item" key={idx}>
                <div className="img_name">
                  <div className="img">
                    <Image
                      alt={imgName}
                      src={url}
                      objectFit="cover"
                      objectPosition="center"
                      layout="fill"
                    />
                  </div>
                  <div className="name">
                    <p>{make}</p>
                    <small>{bodyType}</small>
                  </div>
                </div>

                <div className="col">
                  <p className="model">{engine}</p>
                  <small>premimu plus</small>
                </div>

                <p className="year">{year}</p>

                <div className="model">
                  <div className="text">
                    <p>{name}</p>
                    <small>293 winson park apt</small>
                  </div>
                </div>

                <div className="col">
                  <p className="model">01 nov 2021</p>
                  <small>8:14pm</small>
                </div>

                <div className="col">
                  <p className="year">${retailPrice || '20,563'}</p>
                  <small>10 bids</small>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="center">
          <big color="tomato">You don&apos;t have any SOLD cars</big>
        </div>
      )}
    </div>
  );
};

export default SoldPage;
