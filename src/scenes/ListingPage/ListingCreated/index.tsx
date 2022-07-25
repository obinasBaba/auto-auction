import React, { useEffect } from 'react';
import s from './listingcreated.module.scss';
import { Button } from '@mui/material';
import { ListingFormStepComponent } from '@/scenes/ListingPage';
import { gql, useMutation } from '@apollo/client';
import useError from '@/helpers/useError';

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

const ListingCreated: ListingFormStepComponent = ({ formikProps }) => {
  const { values } = formikProps;
  const [createAuction, { data, error, loading }] = useMutation(CREATE_AUCTION);

  useError(error);

  useEffect(() => {
    console.log('data: ', data, loading);
  }, [data, loading]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <h2>Listing Created</h2>
        <p>
          your new listing successfully created <br /> please setup avalablity
          and pricing
        </p>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            values.images = values.images.map(({ url, id, name }: any) => ({
              url,
              id,
              name,
            }));

            values.itemDetail.vin = values.itemDetail.vin + Math.random() * 100;

            createAuction({
              variables: {
                input: values,
              },
            })
              .then((r) => {
                console.log('create auction data ::    ', r.data.auctionCreate);
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
