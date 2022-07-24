import React, { useEffect, useState } from 'react';
import s from './activebidspage.module.scss';
import { gql, useQuery } from '@apollo/client';
import { useAppContext } from '@/context';
import ActiveAuctionItem from '@/scenes/ActiveBidsPage/ActiveAuctionItem';

const ACTIVE_AUCTIONS = gql`
  query ActiveAuction($input: AuctionFilterInput) {
    auctionList(input: $input) {
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

      address {
        id
        city
      }
      itemDetail {
        id
      }
    }
  }
`;

const ActiveBidsPage = () => {
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);
  const { data, loading, error } = useQuery(ACTIVE_AUCTIONS, {
    variables: {
      input: {
        status: ['active'],
      },
    },
  });

  useEffect(() => {
    console.log('active auctions: ', data, loading);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }

    if (data) {
      console.log(data.auctionList[0]);
      setActiveAuctions(data.auctionList);
    }
  }, [data, loading, error]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        {activeAuctions.length ? (
          activeAuctions.map((item, index) => (
            <ActiveAuctionItem
              item={item}
              className="auction_item"
              key={index}
            />
          ))
        ) : (
          <h1>no active auction</h1>
        )}
      </div>
    </div>
  );
};

export default ActiveBidsPage;
