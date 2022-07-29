import React, { useEffect, useState } from 'react';
import s from './active.module.scss';
import Image from 'next/image';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import { useSnackbar } from 'notistack';
import BMD from '@/scenes/MyScheduledAuctions/img_1.png';

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
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default MyActiveAuctionsPage;
