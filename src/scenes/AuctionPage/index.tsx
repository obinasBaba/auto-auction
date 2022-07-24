import React, { useEffect, useState } from 'react';
import s from './auctionpage.module.scss';
import Image from 'next/image';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import {
  AddCircleTwoTone,
  ArrowForwardIos,
  FilterAlt,
  RemoveCircleTwoTone,
  Settings,
} from '@mui/icons-material';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { MotionWrapper } from '@/components/MotionWrapper';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

const FilterItem = ({ label }: any) => {
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => setShow((show) => !show);

  return (
    <motion.div layout className="filter_item">
      <motion.header layout>
        <FormControlLabel
          value={show}
          checked={show}
          control={
            <Checkbox
              icon={<AddCircleTwoTone />}
              checkedIcon={<RemoveCircleTwoTone />}
              onChange={() => toggle()}
            />
          }
          label={label}
          labelPlacement="start"
        />
      </motion.header>
      <AnimatePresence>
        {show && (
          <MotionWrapper className="filter_content">
            <div className="content_item">
              <FormControlLabel
                value="value"
                control={
                  <Checkbox
                  // onChange={() => toggle()}
                  />
                }
                label="option - 1"
                labelPlacement="end"
              />
              <Typography variant="subtitle2" color="secondary">
                1230
              </Typography>
            </div>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ALL_AUCTIONS = gql`
  query ActiveAuction($input: AuctionFilterInput) {
    auctionList(input: $input) {
      id
      title
      startingDate
      description
      startingBid
      duration
      createdAt
      status
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

const AuctionPage = () => {
  const { data, loading, error } = useQuery(ALL_AUCTIONS, {});
  const [auctionList, setAuctionList] = useState<any[]>([]);

  useEffect(() => {
    console.log('all auctions: ', data, loading);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }

    if (data) {
      console.log(data.auctionList[0]);
      setAuctionList(data.auctionList);
    }
  }, [data, loading, error]);

  return (
    <div className={s.container}>
      <h1>Auctions</h1>
      <header></header>

      <main className="auction_content">
        <div className="list">
          {auctionList.map(
            (
              {
                id,
                status,
                itemDetail: {
                  vin,
                  name,
                  defaultImage: { url, name: imgName = 'car image' },
                },
              },
              idx,
            ) => (
              <Link href={`./auction/${'car1'}`} key={id}>
                <a>
                  <div className="auction_item">
                    <div className="car_img">
                      <Image
                        alt={imgName}
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
                          # {vin}
                        </Typography>
                        <h2 className="title">{name}</h2>
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
                          <h4>$21,480</h4>
                          <Typography
                            variant="subtitle2"
                            className="sub_detail"
                            color="secondary"
                          >
                            price
                          </Typography>
                        </div>
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

                        <div className="lot">
                          <Button color="secondary" variant="outlined" disabled>
                            #2839984
                          </Button>
                          <Button
                            color="primary"
                            variant="contained"
                            disabled={
                              status === 'inactive' || status === 'ended'
                            }
                          >
                            {status === 'active'
                              ? 'Bid Now'
                              : status === 'inactive'
                              ? 'not started'
                              : 'ended'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ),
          )}
        </div>
        <div className="filter">
          <div className="filter_wrapper">
            <header>
              <FilterAlt color="secondary" />
              <p>Filter By</p>
            </header>

            <LayoutGroup id="filter">
              <motion.div layout className="filter_content">
                <FilterItem label="Year" />
                <FilterItem label="Model" />
                <FilterItem label="Make" />
              </motion.div>
            </LayoutGroup>
          </div>
        </div>
      </main>

      <div className="pagination">
        <Button className="page_no" variant="contained">
          1
        </Button>
        <Button className="page_no" variant="contained">
          2
        </Button>
        <Button className="page_no" variant="contained">
          3
        </Button>
        <Button className="page_no" variant="contained">
          4
        </Button>
        <Button
          className="next_btn"
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIos sx={{ fontSize: 10 }} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AuctionPage;
