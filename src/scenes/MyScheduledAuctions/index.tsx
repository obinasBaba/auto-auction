import React, { useEffect, useState } from 'react';
import s from './scheduled.module.scss';
import Image from 'next/image';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import { Delete, Settings } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';

const SCHEDULED = gql`
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

const MyScheduledAuctions = () => {
  const { currentUser } = useAppContext();
  const [scheduled, setScheduled] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: subData,
    error: subError,
    loading: subLoading,
  } = useSubscription(CHECKUP);

  const { data, loading, error, refetch } = useQuery(SCHEDULED, {
    initialFetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    // pollInterval: 0,
    variables: {
      input: {
        status: ['inactive'],
      },
      myAuctionListId: currentUser?.id,
    },
  });

  useError(error, data);

  useEffect(() => {
    // if (!currentUser) return;
    console.log('getSchedule useEffect');
    if (data) {
      setScheduled(data.myAuctionList);
    }
  }, [data, loading, error]);

  useEffect(() => {
    console.log(
      'loading: ',
      subLoading,
      'schedule sub data ----------- : ',
      subData,
    );

    if (subData) {
      enqueueSnackbar('Your schedule is online: ', { variant: 'success' });
    }

    refetch();
  }, [subData, subError, subLoading, refetch]);

  return (
    <div className={s.container}>
      <h1>Scheduled Auctions</h1>

      <div className="empty">
        {scheduled.length === 0 ? (
          <h1>You have no scheduled auction </h1>
        ) : null}
      </div>

      <div className="list">
        {scheduled.map(
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
                    alt="schedule car"
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
              <Button variant="outlined" color="warning" size="small">
                Edit
              </Button>
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

export default MyScheduledAuctions;
