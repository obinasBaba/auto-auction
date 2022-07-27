import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useFormik } from 'formik';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import s from './activeauctionitem.module.scss';
import { useSnackbar } from 'notistack';

const CREATE_BID = gql`
  mutation ($input: BidInput!) {
    bidCreate(input: $input) {
      bid {
        amount
        id
        dealerId
        auctionId
        createdAt
      }

      errors {
        message
      }
    }
  }
`;

const ON_BID = gql`
  subscription {
    bidCreate {
      bid {
        amount
      }
      errors {
        message
      }
    }
  }
`;

const ActiveAuctionItem = ({ auction, refetch }: any) => {
  const [bid, { data, error, loading, called }] = useMutation(CREATE_BID);
  const { currentUser } = useAppContext();
  const [lastBid, setLastBid] = useState<any>();

  const {
    id,
    userId,
    currentPrice,
    startingDate,
    endingDate,
    activeBids,
    highestBid,
    itemDetail: {
      defaultImage: { url, name },
    },
  } = auction;

  // useError(subError, subData);
  useError(error, data);

  const st = new Date(startingDate);
  const e = new Date(endingDate);
  const duration = new Date(st.getTime() - e.getTime());
  const disable = userId == currentUser?.id;

  useEffect(() => {
    if (data?.bidCreate?.bid) {
      setLastBid(data.bidCreate?.bid);
      console.log('lastBid-', data.bidCreate?.bid);
    }
  }, [data, loading, called]);

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values, formikHelpers) => {
      // console.log('onBid submit:', values);
      bid({
        variables: {
          input: {
            ...values,
            auctionId: id,
            dealerId: currentUser?.id,
            createdAt: Date.now().toString(),
          },
        },
      })
        .then((data) => {
          formikHelpers.resetForm();
        })
        .catch(console.log);
    },
  });

  return (
    <div className={s.container}>
      <Link href={`./auction/${'car1'}`}>
        <a>
          <div className="car_img">
            <Image alt={name} src={url} layout="fill" objectFit="cover" />
          </div>
        </a>
      </Link>
      <div className="detail">
        {userId == currentUser?.id && (
          <Button
            color="primary"
            variant="outlined"
            size="small"
            className="edit_btn"
          >
            Edit
          </Button>
        )}

        <div className="header_detail">
          <Typography variant="body2" className="vin_detail" color="secondary">
            # {23232323} Lb:{lastBid?.id} h:{highestBid} i:{currentUser?.id}
          </Typography>
          <h2 className="title">bmw 424 sport package</h2>
          <Typography
            variant="subtitle2"
            className="sub_detail"
            color="secondary"
          >
            11,475 Miles &nbsp; &#8226; &nbsp; White &nbsp; &#8226; &nbsp; AWD
            &nbsp; &#8226; &nbsp; 4-Cylinder Turbo
          </Typography>
        </div>

        <div className="model">
          <Settings />
          <p>
            Subaru Champlin, Othoberg, Hi 797979 {duration.getDay().toString()}{' '}
          </p>
        </div>

        <div className="other_detail">
          <div className="col">
            <h4>
              {duration.getDay().toString()}d&nbsp;
              {duration.getHours().toString()}hr&nbsp;
              {duration.getMinutes().toString()}m
            </h4>
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
          </div>
          <div className="col">
            <h4>{activeBids || 0}</h4>
            <Typography
              variant="subtitle2"
              className="sub_detail"
              color="secondary"
            >
              Active bids
            </Typography>
          </div>
          <div className="col">
            <h4>$ {currentPrice}</h4>
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
          <form className="input" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="amount"
              type="number"
              variant="outlined"
              disabled={highestBid === lastBid?.id || disable}
              color="primary"
              label="Place your bid"
              placeholder={
                highestBid == lastBid?.id
                  ? `Your bid was:  ${lastBid?.amount} $`
                  : 'Place your bid'
              }
              helperText="(Minimum $4,500)"
              value={formik.values.amount}
              onChange={formik.handleChange}
              focused={false}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={
                        (lastBid?.id && highestBid == lastBid?.id) || disable
                      }
                    >
                      Place Bid
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActiveAuctionItem;
