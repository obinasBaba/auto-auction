import React, { useEffect, useState } from 'react';
import s from './search.module.scss';
import { gql, useQuery } from '@apollo/client';
import useError from '@/helpers/useError';
import Image from 'next/image';

const SAVED = gql`
  query {
    auctionSaved {
      id
      title
      savedId
      startingDate
      description
      startingBid
      duration
      createdAt
      status
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
          imageId
          isDefault
          url
          name
        }
      }
      address {
        id
        city
        country
        zipcode
      }
      images {
        id
        imageId
        isDefault
        url
        name
      }
    }
  }
`;

const SavedPage = () => {
  const [savedCars, setSavedCars] = useState<any[]>([]);
  const { data, loading, error, refetch } = useQuery(SAVED, {
    fetchPolicy: 'cache-and-network',
  });

  useError(error, data);

  useEffect(() => {
    console.log('saved auctions: ', data, loading);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }
    if (data?.auctionSaved) {
      setSavedCars(data.auctionSaved);
    }
  }, [data, loading, error]);

  return (
    <div className={s.container}>
      <h1> your Saved cars</h1>

      {savedCars.length ? (
        <div className="list">
          {savedCars.map(
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

export default SavedPage;
