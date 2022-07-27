import React, { useEffect, useState } from 'react';
import s from './activebidspage.module.scss';
import { gql, useQuery, useSubscription } from '@apollo/client';
import ActiveAuctionItem from '@/scenes/ActiveBidsPage/ActiveAuctionItem';
import { useSnackbar } from 'notistack';
import useError from '@/helpers/useError';
import { useAppContext } from '@/context';

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
        dealerId
      }
      errors {
        message
      }
    }
  }
`;

const ActiveBidsPage = () => {
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);
  const { currentUser } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

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
      console.log('subscrition data:', subData);
      if (subData.bidCreate.bid.dealerId !== currentUser?.id) {
        enqueueSnackbar('there is a new bid, on auction-1', {
          variant: 'info',
        });
      }
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
      <h1 className="title">Active Bids</h1>

      <div className="wrapper">
        {activeAuctions.length ? (
          activeAuctions.map((auction, index) => (
            <ActiveAuctionItem
              auction={auction}
              refetch={refetch}
              className="auction_item"
              key={index}
            />
          ))
        ) : (
          <div className="center">
            <h1>no active auction</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveBidsPage;
