import React, { useEffect, useState } from 'react';
import s from './bidding.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Divider, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { ALL_AUCTIONS } from '@/scenes/AuctionPage';

const Bidding = () => {
  const { data, loading, error, refetch } = useQuery(ALL_AUCTIONS, {
    fetchPolicy: 'cache-and-network',
  });

  const [auctionList, setAuctionList] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    console.log('all auctions: ', data, loading);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }

    if (data) {
      setAuctionList(data.auctionList);
    }
  }, [data, loading, error]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <div className="list">
          {auctionList.map(
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
                  </div>
                </div>

                <div className="lot">
                  <Button
                    color="primary"
                    variant="contained"
                    // size="small"
                    // disabled={status === 'inactive' || status === 'ended'}
                  >
                    Place Bid
                  </Button>

                  <div className="value_info">
                    <div className="col">
                      <h4>$ {Number(retailPrice).toLocaleString()} </h4>
                      <Typography
                        variant="subtitle2"
                        className="sub_detail"
                        color="secondary"
                      >
                        Price
                      </Typography>
                    </div>

                    <Divider orientation="vertical" />

                    <div className="col">
                      <h4>$71,480</h4>
                      <Typography
                        variant="subtitle2"
                        className="sub_detail"
                        color="secondary"
                      >
                        10 bids
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

export default Bidding;
