import React, { useEffect } from 'react';
import s from './listingcreated.module.scss';
import { Button } from '@mui/material';
import { fetcher } from '@/helpers/fetcher';
import data from '../defaultValue.json';
import { ListingFormStepComponent } from '@/scenes/ListingPage';

const ListingCreated: ListingFormStepComponent = ({ formikProps }) => {
  const { values } = formikProps;

  useEffect(() => {
    console.log('data: ', data);
  });

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

            fetcher(
              /* GraphQL */ `
                mutation ($input: AuctionListingInput!) {
                  auctionCreate(input: $input) {
                    errors {
                      message
                    }
                    auction {
                      id
                    }
                  }
                }
              `,
              { input: values },
            ).then((r) => {
              console.log('response ::    ', r);
            });
          }}
        >
          proceed to auction setup
        </Button>
      </div>
    </div>
  );
};

export default ListingCreated;
