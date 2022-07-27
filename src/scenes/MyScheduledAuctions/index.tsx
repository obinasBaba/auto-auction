import React, { useEffect, useState } from 'react';
import s from './scheduled.module.scss';
import Image from 'next/image';
import { gql, useLazyQuery, useSubscription } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import { Delete, Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';

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

  const {
    data: subData,
    error: subError,
    loading: subLoading,
  } = useSubscription(CHECKUP);

  const [getScheduled, { data, loading, error, refetch }] = useLazyQuery(
    SCHEDULED,
    {
      initialFetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only',
      variables: {
        input: {
          status: ['inactive'],
        },
        myAuctionListId: currentUser?.id,
      },
    },
  );

  useError(error, data);

  useEffect(() => {
    // if (!currentUser) return;
    console.log('getSchedule useEffect');

    getScheduled().then(({ data }) => {
      console.log('getShcedue invoked');
      if (data) {
        setScheduled(data.myAuctionList);
      }
    });
  }, [getScheduled]);

  useEffect(() => {
    console.log('loading: ', subLoading, 'data: ', subData);
    refetch();
  }, [subData, subLoading, refetch]);

  return (
    <div className={s.container}>
      <h1>Scheduled Auctions</h1>

      <div className="empty">
        {scheduled.length === 0 ? (
          <big>You have no scheduled auction </big>
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
