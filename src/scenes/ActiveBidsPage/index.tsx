import React, { useEffect, useState } from 'react';
import s from './activebidspage.module.scss';
import Image from 'next/image';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import Link from 'next/link';
import Car from '@/public/auction-car1.jpg';
import { gql, useQuery } from '@apollo/client';

const ACTIVE_AUCTIONS = gql`
  query ActiveAuction($input: AuctionFilterInput) {
    auctionList(input: $input) {
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

      address {
        id
        city
      }
      itemDetail {
        id
      }
    }
  }
`;

const ActiveBidsPage = () => {
  const { data, loading, error } = useQuery(ACTIVE_AUCTIONS, {
    variables: {
      input: {
        status: ['active'],
      },
    },
  });
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);

  useEffect(() => {
    console.log('active auctions: ', data, loading);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }

    if (data) {
      console.log(data.auctionList[0]);
      setActiveAuctions(data.auctionList);
    }
  }, [data, loading, error]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        {activeAuctions.length ? (
          activeAuctions.map(
            (
              {
                itemDetail: {
                  defaultImage: { url, name },
                },
              },
              index,
            ) => (
              <Link href={`./auction/${'car1'}`} key={index}>
                <a>
                  <div className="auction_item">
                    <div className="car_img">
                      <Image
                        alt={name}
                        src={url}
                        height="100%"
                        width="100%"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="detail">
                      <div className="header_detail">
                        <Typography
                          variant="body2"
                          className="vin_detail"
                          color="secondary"
                        >
                          # {23232323}
                        </Typography>
                        <h2 className="title">bmw 424 sport package</h2>
                        <Typography
                          variant="subtitle2"
                          className="sub_detail"
                          color="secondary"
                        >
                          11,475 Miles &nbsp; &#8226; &nbsp; White &nbsp;
                          &#8226; &nbsp; AWD &nbsp; &#8226; &nbsp; 4-Cylinder
                          Turbo
                        </Typography>
                      </div>

                      <div className="model">
                        <Settings />
                        <p>Subaru Champlin, Othoberg, Hi 797979</p>
                      </div>

                      <div className="other_detail">
                        <div className="col">
                          <h4>10d&nbsp;12hrs</h4>
                          <Typography
                            variant="subtitle2"
                            className="sub_detail"
                            color="secondary"
                          >
                            Time left
                          </Typography>
                        </div>
                        <div className="col">
                          <h4>sunday, 9:49PM</h4>
                          <Typography
                            variant="subtitle2"
                            className="sub_detail"
                            color="secondary"
                          >
                            Auction Ending
                          </Typography>
                        </div>{' '}
                        <div className="col">
                          <h4>19</h4>
                          <Typography
                            variant="subtitle2"
                            className="sub_detail"
                            color="secondary"
                          >
                            Active bids
                          </Typography>
                        </div>
                        <div className="col">
                          <h4>$ 23,333</h4>
                          <Typography
                            variant="subtitle2"
                            className="sub_detail"
                            color="secondary"
                          >
                            current bids
                          </Typography>
                        </div>
                      </div>

                      <div className="lot">
                        <div className="input">
                          <TextField
                            fullWidth
                            type="text"
                            variant="outlined"
                            color="primary"
                            label="Start typing"
                            helperText="(Minimum $4,500)"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Button variant="contained" size="large">
                                    Place Bid
                                  </Button>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ),
          )
        ) : (
          <h1>no active auction</h1>
        )}
      </div>
    </div>
  );
};

export default ActiveBidsPage;
