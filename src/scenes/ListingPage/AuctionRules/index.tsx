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
import { MotionWrapper } from '@/scenes/ListingPage/AdditionalFeatures';

const AuctionRules = (props: any) => {
  const [isAuction, setIsAuction] = useState<boolean>(true);

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
                  <TextField
                    name="price"
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
                  />

                  <TextField
                    name="price"
                    label="Auction duration (Days)"
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

                  <div className="reserve_price">
                    <FormControlLabel
                      className="checkbox"
                      value="fixed"
                      control={<Switch color="primary" />}
                      label="Fixed minimal price"
                      labelPlacement="start"
                    />

                    <Input
                      id="standard-adornment-amount"
                      inputMode="numeric"
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </div>

                  <FormControlLabel
                    className="checkbox"
                    value="fixed"
                    control={<Switch color="primary" />}
                    label="Buy is now"
                    labelPlacement="start"
                  />

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
