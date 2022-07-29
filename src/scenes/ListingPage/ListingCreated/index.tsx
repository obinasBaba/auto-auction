import React, { useEffect } from 'react';
import s from './listingcreated.module.scss';
import { Button, Tooltip } from '@mui/material';
import { ListingFormStepComponent } from '@/scenes/ListingPage';
import { gql, useMutation } from '@apollo/client';
import useError from '@/helpers/useError';
import { useRouter } from 'next/router';

const CREATE_AUCTION = gql`
  mutation ($input: AuctionListingInput!) {
    auctionCreate(input: $input) {
      errors {
        message
      }
      auction {
        id
        startingDate
        endingDate
      }
    }
  }
`;

const ListingCreated: ListingFormStepComponent = ({
  formikProps,
  controller: { nextStep, prevStep, setStep },
}) => {
  const router = useRouter();
  const { values } = formikProps;
  const [createAuction, { data, error, loading }] = useMutation(CREATE_AUCTION);

  useError(error, data);

  useEffect(() => {
    console.log('data: ', data, loading);
  }, [data, loading]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <h2 className="title">Finalize Your Listing</h2>

        <div className="all">
          <h3>Item Detail</h3>
          <div className="auction_detail">
            {Object.entries(formikProps.values.itemDetail).map(
              (value, index, array) => (
                <div
                  key={value[0]}
                  className="item"
                  onClick={() => {
                    if (index <= 1) {
                      console.log('index: ', index);
                      return setStep(0);
                    } else if (index <= 16) {
                      return setStep(1);
                    } else setStep(2);
                  }}
                >
                  <Tooltip title="Edit" key={value[0]} placement="top-start">
                    <Button variant="text" color="inherit">
                      <p>
                        {value[0]} :<small>{value[1].toString()}</small>
                      </p>
                    </Button>
                  </Tooltip>
                </div>
              ),
            )}
          </div>

          <h3>Auction Detail</h3>
          <div className="auction_detail">
            {Object.entries(formikProps.values.auction).map(
              (value, index, array) => (
                <div
                  key={value[0]}
                  className="item"
                  onClick={() => {
                    prevStep();
                  }}
                >
                  <Tooltip title="Edit">
                    <Button variant="text" color="inherit">
                      <p>
                        {value[0]} : <small>{value[1].toString()}</small>
                      </p>
                    </Button>
                  </Tooltip>
                </div>
              ),
            )}
          </div>
        </div>

        <Button
          variant="contained"
          size="large"
          // fullWidth
          onClick={() => {
            values.images = values.images.map(({ url, id, name }: any) => ({
              url,
              id,
              name,
            }));

            values.itemDetail.vin = values.itemDetail.vin + Math.random() * 100;
            values.itemDetail.year = new Date(
              values.itemDetail.year,
            ).getFullYear() as any;

            console.log('new year: ', values.itemDetail.year);

            // return;

            createAuction({
              variables: {
                input: values,
              },
            })
              .then((r) => {
                if (r.data?.auctionCreate) {
                  console.log('create auction data:', r.data.auctionCreate);
                  router.push('/dashboard/scheduled');
                }
              })
              .catch(console.log);
          }}
        >
          proceed to auction setup
        </Button>
      </div>
    </div>
  );
};

export default ListingCreated;
