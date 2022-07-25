import React, { useEffect, useState } from 'react';
import s from './scheduled.module.scss';
import Image from 'next/image';
import { gql, useLazyQuery } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import { Delete, Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const ONLINE_AUCTIONS = gql`
  query OnlineList($myAuctionListId: ID!, $input: AuctionFilterInput) {
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

const AUCTION_CREATED = gql`
  subscription {
    auctionCreate {
      auction {
        id
      }
      errors {
        message
      }
    }
  }
`;

const MyActiveAuctionsPage = () => {
  const { currentUser } = useAppContext();
  const [onlineAuctions, setOnlineAuctions] = useState<any[]>([]);
  /*
    const {
      data: subData,
      error: subError,
      loading: subLoading,
    } = useSubscription(AUCTION_CREATED);*/

  const [getOnlineAuctions, { data, loading, error, refetch }] = useLazyQuery(
    ONLINE_AUCTIONS,
    {
      initialFetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only',
      variables: {
        input: {
          status: ['active'],
        },
        myAuctionListId: currentUser?.id,
      },
    },
  );

  useError(error);

  useEffect(() => {
    // if (!currentUser) return;
    console.log('getSchedule useEffect');

    getOnlineAuctions().then(({ data }) => {
      console.log('getShcedue invoked');
      if (data) {
        setOnlineAuctions(data.myAuctionList);
      }
    });
  }, [getOnlineAuctions]);

  /* useEffect(() => {
     console.log('loading: ', subLoading, 'data: ', subData);
     if (subData) {
       refetch();
     }
   }, [subData, subLoading, refetch]);*/

  return (
    <div className={s.container}>
      <h1>Online Auctions</h1>

      <div className="empty">
        {onlineAuctions.length === 0 ? (
          <big>You have no online auction </big>
        ) : null}
      </div>

      <div className="list">
        {onlineAuctions.map(
          (
            {
              id,
              itemDetail: {
                defaultImage: { url, name },
              },
            },
            idx,
          ) => (
            <div className="item" key={idx}>
              <div className="img_name">
                <div className="img">
                  <Image
                    alt="online img"
                    src={url}
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                  />
                </div>
                <div className="name">
                  <h3>Audi</h3>
                  <small>sedan</small>
                </div>
              </div>

              <div className="col">
                <h3 className="model">forster</h3>
                <small>premimu plus</small>
              </div>

              <h3 className="year">2010</h3>

              <div className="model">
                <Settings />
                <div className="text">
                  <h3>Subaru Champlin, Othoberg, Hi 797979</h3>
                  <small>293 winson park apt</small>
                </div>
              </div>

              <h3 className="year">$21,900</h3>
              <IconButton color="primary">
                <Delete />
              </IconButton>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default MyActiveAuctionsPage;
