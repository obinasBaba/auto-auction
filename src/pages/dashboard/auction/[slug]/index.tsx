import React, { useEffect, useState } from 'react';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { ArrowForwardIos, Settings } from '@mui/icons-material';
import s from './slug.module.scss';
import car1 from '@/public/product1/44539872_Image_2.jpg';
import car2 from '@/public/product1/44539872_Image_3.jpg';
import car3 from '@/public/product1/44539872_Image_4.jpg';
import car4 from '@/public/product1/44539872_Image_5.jpg';
import car5 from '@/public/product1/44539872_Image_6.jpg';
import Image from 'next/image';
import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MotionWrapper } from '@/components/MotionWrapper';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { fetcher } from '@/helpers/fetcher';

const cars = [car1, car2, car3, car4, car5];

const variants: Variants = {
  initial: {
    opacity: 0.5,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export async function getStaticProps({}: GetStaticPropsContext) {
  const {
    data: { auctionList },
  } = await fetcher(
    /* GraphQL */ `
      query ($auctionInfoId: ID!) {
        auctionInfo(id: $auctionInfoId) {
          id
          description
          itemDetail {
            id
            name
            slug
            defaultImage {
              id
              url
            }
          }
          images {
            id
          }
        }
      }
    `,
    {
      auctionInfoId: '1',
    },
  );

  return {
    props: {},
    revalidate: 200,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  const {
    data: { auctionList },
  } = await fetcher(/* GraphQL */ `
    query {
      auctionList {
        id
        itemDetail {
          id
          vin
          name
          slug
          defaultImage {
            id: imageId
            url
          }
        }
      }
    }
  `);

  console.log('aucitonList: ', auctionList);

  return {
    paths: [],
    fallback: true,
  };
}

const ProductDetail = () => {
  const [selectedImg, setSelectedImg] = useState<number>(1);
  const [hovered, setHovered] = useState<{ idx: number; hovering: boolean }>({
    idx: 1,
    hovering: false,
  });

  useEffect(() => {
    fetcher(
      /* GraphQL */ `
        query ($auctionInfoId: ID!) {
          auctionInfo(id: $auctionInfoId) {
            id
            description
            itemDetail {
              id
              name
              slug
              defaultImage {
                id
                url
              }
            }
            images {
              id
            }
          }
        }
      `,
      {
        auctionInfoId: '1',
      },
    )
      .then((r) => console.log('result: ', r))
      .catch((err) => console.log('errrr: ', err));
  }, []);

  return (
    <div className={s.container}>
      <h1>Subaru Champlin, Othoberg, Hi 797979</h1>

      <div className="product_detail_wrapper">
        <div className="product_images">
          <AnimatePresence exitBeforeEnter>
            <MotionWrapper
              className="img preview"
              key={selectedImg}
              variants={variants}
            >
              <Image
                src={cars[selectedImg]}
                objectFit="cover"
                alt="selected customer image"
              />
            </MotionWrapper>
          </AnimatePresence>

          {cars.map((car, idx) => (
            <motion.div
              className="img"
              key={idx}
              onHoverStart={() => {
                if (idx !== selectedImg) setHovered({ idx, hovering: true });
              }}
              onHoverEnd={() => {
                if (idx !== selectedImg) setHovered({ idx, hovering: false });
              }}
            >
              <Image
                src={car}
                objectFit="cover"
                onClick={() => setSelectedImg(idx)}
                className={clsx({ [s.selected]: idx === selectedImg })}
                alt="customer image"
              />
              {idx === selectedImg && (
                <motion.div className="outline" layoutId="hoveroutline" />
              )}
              {idx === hovered.idx && hovered.hovering && (
                <motion.div className="hoverline" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="detail_wrapper">
          <div className="product_detail">
            <div className="hor">
              <div className="model">
                <Settings />
                <p>Subaru Champlin, Othoberg, Hi 797979</p>
              </div>
              <Button color="secondary" variant="outlined" disabled>
                #2839984
              </Button>
            </div>

            <div className="title">
              <h2>2013 Subaru Forester Premium Plus</h2>
              <Typography
                variant="subtitle2"
                className="sub_detail"
                color="secondary"
              >
                11,475 Miles &nbsp; &#8226; &nbsp; White &nbsp; &#8226; &nbsp;
                AWD &nbsp; &#8226; &nbsp; 4-Cylinder Turbo
              </Typography>
            </div>

            <div className="info_bar">
              <div className="col">
                <h4>10d 12hrs</h4>
                <Typography
                  variant="subtitle2"
                  className="sub_detail"
                  color="secondary"
                >
                  Time left
                </Typography>
              </div>
              <div className="col">
                <h4>Sunday, 9:38PM</h4>
                <Typography
                  variant="subtitle2"
                  className="sub_detail"
                  color="secondary"
                >
                  Auction Ending
                </Typography>
              </div>
              <div className="col">
                <h4>18</h4>
                <Typography
                  variant="subtitle2"
                  className="sub_detail"
                  color="secondary"
                >
                  Active bids
                </Typography>
              </div>
              <div className="col">
                <h4>$17,000</h4>
                <Typography
                  variant="subtitle2"
                  className="sub_detail"
                  color="secondary"
                >
                  current bid
                </Typography>
              </div>
            </div>

            <div className="key_value">
              <div className="kv_item">
                <p className="key">Title</p>
                <p className="value">Salvage</p>
              </div>
              <div className="kv_item">
                <p className="key">Loss Type</p>
                <p className="value">Collision</p>
              </div>
              <div className="kv_item">
                <p className="key">Damage</p>
                <p className="value">Front Left</p>
              </div>
              <div className="kv_item">
                <p className="key">Vin Code</p>
                <p className="value">WALTFAFPDA******</p>
              </div>
              <div className="kv_item">
                <p className="key">Highlights</p>
                <p className="value">Run and Drive</p>
              </div>
              <div className="kv_item">
                <p className="key">Transmission</p>
                <p className="value">Automatic</p>
              </div>
              <div className="kv_item">
                <p className="key">Est. Retail Value</p>
                <p className="value">$9000</p>
              </div>
            </div>

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
    </div>
  );
};

export default ProductDetail;
