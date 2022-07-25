import React, { useState } from 'react';
import s from './auctionrules.module.scss';
import {
  Button,
  FormControlLabel,
  Input,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
} from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Field } from 'formik';
import { MotionWrapper } from '@/components/MotionWrapper';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ListingFormStepComponent } from '@/scenes/ListingPage';

const AuctionRules: ListingFormStepComponent = ({ formikProps }) => {
  const [isAuction, setIsAuction] = useState<boolean>(true);
  const [buyNow, setBuyNow] = useState<boolean>(false);
  const [reservePrice, setReservePrice] = useState<boolean>(false);

  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <motion.div className={s.container}>
      <motion.div className="wrapper" layout>
        <motion.h2 className="title" layout>
          Set auction rules for <br /> your vehicle
        </motion.h2>

        <motion.div className="form">
          <LayoutGroup id="unic2">
            <motion.div className="controller" layout>
              <Button
                size="large"
                variant="outlined"
                color={isAuction ? 'primary' : 'secondary'}
                endIcon={
                  !isAuction ? <RadioButtonUnchecked /> : <CheckCircle />
                }
                onClick={() => setIsAuction(true)}
              >
                Auction
                {isAuction && (
                  <motion.div layoutId="border" className="border" />
                )}
              </Button>

              <Button
                size="large"
                variant="outlined"
                color={!isAuction ? 'primary' : 'secondary'}
                endIcon={isAuction ? <RadioButtonUnchecked /> : <CheckCircle />}
                onClick={() => setIsAuction(false)}
              >
                Fixed Price
                {!isAuction && (
                  <motion.div layoutId="border" className="border" />
                )}
              </Button>
            </motion.div>
          </LayoutGroup>

          <motion.div className="content">
            <AnimatePresence exitBeforeEnter>
              {isAuction ? (
                <MotionWrapper key="auction">
                  <Field
                    name="auction.startingBid"
                    label="Starting Bid"
                    type="text"
                    required
                    variant="outlined"
                    helperText="To attract buyers and increase competition for your item, consider a low starting bid. Eg: $2,000.00"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    as={TextField}
                  />

                  {/*  <Field
                    name="auction.duration"
                    label="Auction duration (Days)"
                    type="text"
                    select
                    required
                    variant="outlined"
                    as={TextField}
                  >
                    {[5, 7, 10].map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Field>*/}

                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      disablePast
                      renderInput={(props) => (
                        <Field
                          name="auction.startingDate"
                          required
                          variant="outlined"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...props}
                          as={TextField}
                        />
                      )}
                      label="auction starting date"
                      value={formikProps.values.auction.startingDate}
                      onChange={(value) =>
                        formikProps.setFieldValue('auction.startingDate', value)
                      }
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      disablePast
                      renderInput={(props) => (
                        <Field
                          name="auction.endingDate"
                          required
                          variant="outlined"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...props}
                          as={TextField}
                        />
                      )}
                      label="auction ending date"
                      value={formikProps.values.auction.endingDate}
                      onChange={(value) =>
                        formikProps.setFieldValue('auction.endingDate', value)
                      }
                    />
                  </LocalizationProvider>

                  {/*<Field
                    name="auction.startingDate"
                    label="Schedule for listing start time"
                    required
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    as={TextField}
                  />*/}

                  <motion.div className="col">
                    <FormControlLabel
                      className="checkbox"
                      value="fixed"
                      control={
                        <Switch
                          color="primary"
                          checked={reservePrice}
                          onChange={() => setReservePrice(!reservePrice)}
                        />
                      }
                      label="Reserved price"
                      labelPlacement="start"
                    />

                    {reservePrice && (
                      <Input
                        id="standard-adornment-amount"
                        inputMode="numeric"
                        type="number"
                        className="col_input"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    )}
                  </motion.div>

                  <motion.div className="col">
                    <FormControlLabel
                      className="checkbox"
                      control={
                        <Switch
                          color="primary"
                          checked={buyNow}
                          onChange={() => setBuyNow(!buyNow)}
                        />
                      }
                      label="Buy It Now"
                      labelPlacement="start"
                    />

                    {buyNow && (
                      <Input
                        name="buy_now"
                        className="col_input"
                        id="standard-adornment-amount"
                        inputMode="numeric"
                        type="number"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    )}
                  </motion.div>

                  <FormControlLabel
                    className="checkbox"
                    value="flexible"
                    control={<Switch color="primary" />}
                    label="Flexible price"
                    labelPlacement="start"
                  />
                </MotionWrapper>
              ) : (
                <MotionWrapper key="fixed">
                  <TextField
                    name="price"
                    label="Price"
                    type="text"
                    required
                    variant="outlined"
                    helperText="Your fixed price for selling"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    name="price"
                    label="Listing duration (Days)"
                    type="text"
                    select
                    required
                    variant="outlined"
                  >
                    {[5, 7, 10].map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="year"
                    label="Schedule for listing start time"
                    type="date"
                    required
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <FormControlLabel
                    className="checkbox"
                    value="flexible"
                    control={<Switch color="primary" />}
                    label="Flexible price"
                    labelPlacement="start"
                    sx={{ m: 0 }}
                  />
                </MotionWrapper>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuctionRules;
