import React, { useEffect, useState } from 'react';
import s from './lost.module.scss';
import { useQuery } from '@apollo/client';
import { AUCTIONS_WITH_BIDS } from '@/pages/dashboard/purchase-bids/bidding';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { useAppContext } from '@/context';

const Lost = () => {
  const { data, loading, error, refetch } = useQuery(AUCTIONS_WITH_BIDS, {
    fetchPolicy: 'network-only',
  });

  const [auctionList, setAuctionList] = useState<any[]>([]);
  const { currentUser } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    console.log('all auctions WITH BIDS: ', data, loading);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }

    if (data) {
      setAuctionList(data.getAuctionsWithBids);
    }
  }, [data, loading, error]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <h1>Auctions You&apos;r Bidding</h1>

        <div className="list">
          {auctionList
            .filter(
              ({ status, highestBidder: { dealerId } }) =>
                status === 'ended' && dealerId != currentUser?.id,
            )
            .map(
              (
                {
                  id,
                  status,
                  savedId,
                  itemDetail: {
                    vin,
                    name,
                    cylinders,
                    mileage,
                    exteriorColor,
                    drivetrain,
                    retailPrice,
                    condition,
                    engine,
                    fuel,
                    defaultImage: { url, name: imgName = 'car image' },
                  },
                  highestBidder: { amount },
                },
                idx,
              ) => (
                <div className="auction_item" key={id}>
                  <div className="car_img">
                    <Link href={`./auction/${'car1'}`}>
                      <a>
                        <Image
                          alt={imgName}
                          src={url}
                          height="100%"
                          width="100%"
                          layout="fill"
                          objectFit="cover"
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="detail">
                    <div className="header_detail">
                      <h2 className="title">{name}</h2>

                      <Typography
                        variant="subtitle2"
                        className="sub_detail"
                        color="secondary"
                      >
                        {Number(mileage).toLocaleString()} Miles &nbsp; &#8226;
                        &nbsp; {exteriorColor} &nbsp; &#8226; &nbsp;{' '}
                        {drivetrain?.toUpperCase()} &nbsp; &#8226; &nbsp;{' '}
                        {cylinders}-Cylinder Turbo &nbsp; &#8226; #
                        {vin?.slice(0, 6)}
                      </Typography>
                    </div>

                    <div className="other_detail">
                      <div className="col">
                        <h4>{fuel}</h4>
                        <Typography
                          variant="subtitle2"
                          className="sub_detail"
                          color="secondary"
                        >
                          Fuel
                        </Typography>
                      </div>
                      <div className="col">
                        <h4>{engine}</h4>
                        <Typography
                          variant="subtitle2"
                          className="sub_detail"
                          color="secondary"
                        >
                          Engine
                        </Typography>
                      </div>
                      <div className="col">
                        <h4>{condition}</h4>
                        <Typography
                          variant="subtitle2"
                          className="sub_detail"
                          color="secondary"
                        >
                          Condition
                        </Typography>
                      </div>

                      <div className="col">
                        <h4>${amount}</h4>
                        <Typography
                          variant="subtitle2"
                          className="sub_detail"
                          color="secondary"
                        >
                          final bid
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default Lost;
