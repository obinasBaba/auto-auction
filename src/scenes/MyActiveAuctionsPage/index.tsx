import React, { useEffect, useState } from 'react';
import s from './scheduled.module.scss';
import Image from 'next/image';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import { Delete, Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';

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

const CHECKUP = gql`
  subscription {
    checkUp {
      errors {
        message
      }

      ended {
        id
        status
      }

      started {
        id
        status
      }
    }
  }
`;

const MyActiveAuctionsPage = () => {
  const { currentUser } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const [onlineAuctions, setOnlineAuctions] = useState<any[]>([]);
  /*
    const {
      data: subData,
      error: subError,
      loading: subLoading,
    } = useSubscription(AUCTION_CREATED);*/

  const { data, loading, error, refetch } = useQuery(ONLINE_AUCTIONS, {
    initialFetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    variables: {
      input: {
        status: ['active'],
      },
      myAuctionListId: currentUser?.id,
    },
  });

  const {
    data: subData,
    error: subError,
    loading: subLoading,
  } = useSubscription(CHECKUP);

  useEffect(() => {
    console.log(
      'loading: ',
      subLoading,
      'schedule sub data ----------- : ',
      subData,
    );

    if (subData) {
      enqueueSnackbar('Your auction is ended: ', { variant: 'warning' });
    }

    refetch();
  }, [subData, subError, subLoading, refetch]);

  useError(error, data);

  useEffect(() => {
    // if (!currentUser) return;
    console.log('getSchedule useEffect');

    if (data) {
      console.log('getShcedue invoked');

      setOnlineAuctions(data.myAuctionList);
    }
  }, [data, loading, error]);

  /* useEffect(() => {
     console.log('loading: ', subLoading, 'data: ', subData);
     if (subData) {
       refetch();
     }
   }, [subData, subLoading, refetch]);*/

  return (
    <div className={s.container}>
      <h1>Your Active Auctions</h1>

      <div className="empty">
        {onlineAuctions.length === 0 ? (
          <h1>You have no online auction </h1>
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
