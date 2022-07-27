import React, { useEffect, useState } from 'react';
import s from './activebidspage.module.scss';
import { gql, useQuery, useSubscription } from '@apollo/client';
import ActiveAuctionItem from '@/scenes/ActiveBidsPage/ActiveAuctionItem';
import useError from '@/helpers/useError';

const ACTIVE_AUCTIONS = gql`
  query ActiveAuction($input: AuctionFilterInput) {
    auctionList(input: $input) {
      id
      userId
      title
      startingDate
      endingDate
      description
      startingBid
      currentPrice
      activeBids
      highestBid
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
    }
  }
`;

const SUBSCRIBE_CREATE_BID = gql`
  subscription {
    bidCreate {
      bid {
        id
        amount
        newAmount
      }
      errors {
        message
      }
    }
  }
`;

const ActiveBidsPage = () => {
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);
  const {
    data: subData,
    error: subError,
    loading: subLoading,
  } = useSubscription(SUBSCRIBE_CREATE_BID);

  const { data, loading, error, refetch } = useQuery(ACTIVE_AUCTIONS, {
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    initialFetchPolicy: 'network-only',
    variables: {
      input: {
        status: ['active'],
      },
    },
  });

  useError(subError, data);

  useEffect(() => {
    if (subData) {
      refetch();
    }
  }, [subError, subData, subLoading, refetch]);

  useEffect(() => {
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }

    if (data) {
      console.log('active auctions: ', data?.auctionList?.length, loading);
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
