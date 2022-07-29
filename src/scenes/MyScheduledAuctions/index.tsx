import React, { useEffect, useState } from 'react';
import s from './scheduled.module.scss';
import Image from 'next/image';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import { DeleteTwoTone } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import BMD from './img_1.png';

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

const DELETE_AUCTION = gql`
  mutation ($auctionId: ID!) {
    auctionDelete(auctionId: $auctionId)
  }
`;

const MyScheduledAuctions = () => {
  const { currentUser } = useAppContext();
  const [scheduled, setScheduled] = useState<any[]>([]);
  const [deleteAuction] = useMutation(DELETE_AUCTION);
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
    if (data) {
      console.log('scheduled data: ', data?.myAuctionList[0]);
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
                name,
                make,
                defaultImage: { url, name: imgName },
                mileage,
                retailPrice,
                condition,
                bodyType,
                engine,
                drivetrain,
                year,
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
                <div className="col">
                  <h3>{make}</h3>
                  <p>{bodyType}</p>
                </div>
              </div>

              <div className="col">
                <h3 className="model">{engine || '-'}</h3>
                <p>{drivetrain || '-'}</p>
              </div>

              <div className="col">
                <h3 className="year">{year}</h3>
                <p>{condition}</p>
              </div>

              <div className="model">
                <div className="logo">
                  <Image src={BMD} alt="make url" />
                </div>
                <div className="text col">
                  <h3>{name}</h3>
                  <p>{mileage} mileage</p>
                </div>
              </div>

              <h3 className="year">${retailPrice || 0}</h3>

              <IconButton
                color="primary"
                onClick={() => {
                  deleteAuction({
                    variables: {
                      auctionId: id,
                    },
                  })
                    .then(({ data }) => {
                      console.log('data: ', data);
                      refetch();
                    })
                    .catch((err) => {
                      console.log(JSON.stringify(err, null, 2));
                    });
                }}
              >
                <DeleteTwoTone />
              </IconButton>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default MyScheduledAuctions;
