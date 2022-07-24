import React from 'react';
import s from './activeauctionitem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';

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

const ActiveAuctionItem = ({ item }: any) => {
  const [bid, { data, error, loading, called }] = useMutation(CREATE_BID);
  const { currentUser } = useAppContext();

  useError(error);

  const {
    id,
    itemDetail: {
      defaultImage: { url, name },
    },
  } = item;

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('onSubmit:', values);
      bid({
        variables: {
          input: {
            ...values,
            auctionId: id,
            dealerId: currentUser.id,
            createdAt: Date.now().toString(),
          },
        },
      })
        .then((data) => {
          console.log('data: ', data);
        })
        .catch(console.log);
    },
  });

  return (
    <div className={s.container}>
      <Link href={`./auction/${'car1'}`}>
        <a>
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
        </a>
      </Link>
      <div className="detail">
        <div className="header_detail">
          <Typography variant="body2" className="vin_detail" color="secondary">
            # {23232323}
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
          <form className="input" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="amount"
              type="number"
              variant="outlined"
              color="primary"
              label="Start typing"
              helperText="(Minimum $4,500)"
              value={formik.values.amount}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" size="large" type="submit">
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
