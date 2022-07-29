import React, { useEffect, useState } from 'react';
import s from './listingpage.module.scss';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import ListingCreated from '@/scenes/ListingPage/ListingCreated';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import WhatKindVehicle from '@/scenes/ListingPage/WhatKindVehicle';
import BasicFeatures from '@/scenes/ListingPage/BasicFeatures';
import AdditionalFeatures from '@/scenes/ListingPage/AdditionalFeatures';
import VehicleLocation from '@/scenes/ListingPage/VehicleLocation';
import VehiclePhoto from '@/scenes/ListingPage/VehiclePhoto';
import VehicleDescription from '@/scenes/ListingPage/VehicleDescription';
import AuctionRules from '@/scenes/ListingPage/AuctionRules';
import initialValue from './dummy';

const containerVariants = {};

const wrapperVariants = {
  initial: {
    opacity: 0,
    scale: 0.87,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    // scale: 0.92,
  },
};

const types = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Minivan', 'Cabriolet'];
const makes = ['BMW', 'Audi', 'Lexus', 'Cadillac', 'Ford'];
const models = ['model-1', 'model-2', 'model-3', 'model-4'];
const engine = ['engine-1', 'engine-2', 'engine-3', 'engine-4'];
const color = ['color-1', 'color-2', 'color-3', 'color-4'];
const gearbox = ['manual', 'automatic'];
const condition = ['used', 'new'];

const getShape = (name: string, rules: object = {}) =>
  yup.object({ [name]: yup.object().shape({ ...rules }) });

const steps = [
  /**/ {
    name: 'KIND',
    components: (props: any) => <WhatKindVehicle {...props} />,
    schema: yup.object({
      item: yup.object().shape({}),
    }),
  },
  {
    name: 'FEATURE',
    components: (props: any) => <BasicFeatures {...props} />,
    schema: getShape('itemDetail', {
      make: yup
        .string()
        .oneOf(makes, 'select the manufacture of you vehicle!!'),
      model: yup.string(),
      condition: yup
        .string()
        .oneOf(condition, 'select the condition of you car'),
      mileage: yup
        .number()
        .min(0, "your mileage can't be negative")
        .required('what is the mileage of you car?'),
    }),
  },
  {
    name: 'FEATURE_2',
    components: (props: any) => <AdditionalFeatures {...props} />,
    schema: getShape('itemDetail', {
      gearbox: yup
        .string()
        .oneOf(gearbox, 'select the gearbox type of you vehicle!!'),
    }),
  },

  /*{
    name: 'LOCATION',
    components: (props: any) => <VehicleLocation {...props} />,
    schema: yup.object({
      address: yup.object({
        city: yup.string().required('what is your city'),
        streetAddress: yup.string().required('what is your streetAddress'),
        zipcode: yup.number().required('what is your zipcode'),
        apartmentNumber: yup
          .number()
          .min(0, "apartment number can't be negative")
          .required('what is your home number'),
      }),
    }),
  },*/
  {
    name: 'PHOTOS',
    components: (props: any) => <VehiclePhoto {...props} />,
    schema: yup.object({
      images: yup.array().of(
        yup.object({
          name: yup.string().required('name is required'),
          url: yup.string().required('url is required'),
        }),
      ),
    }),
  },
  {
    name: 'DESCRIPTION',
    components: (props: any) => <VehicleDescription {...props} />,
    schema: yup.object({
      auction: yup.object({
        title: yup.string().required('specify your listing Title'),
        description: yup.string().required('your description please'),
        price: yup.number().min(0, "value can't be negative"),
      }),
    }),
  },
  {
    name: 'RULE',
    components: (props: any) => <AuctionRules {...props} />,
    schema: yup.object({
      auction: yup
        .object()
        .shape({
          startingBid: yup
            .number()
            .min(0, "value can't be negetive")
            .required('state your staring bid price'),
          startingDate: yup.string().required('auction schedule is requred'),
        })
        .required('you need a auction object '),
    }),
  },
  {
    name: 'CREATED',
    components: (props: any) => <ListingCreated {...props} />,
    schema: yup.object({
      checkUp: yup.string(),
    }),
  },
];

// const dummyInitial = dummy;

type ListingFormStepArgType = {
  children?: React.ReactNode;
  formikProps: FormikProps<typeof initialValue>;
} & Record<string, any>;

export type ListingFormStepComponent = React.FC<ListingFormStepArgType>;

const ListingPage = () => {
  const [idx, setIdx] = useState(0);
  const [showDone, setShowDone] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<typeof steps[number]>({
    ...steps[idx],
  });

  const nextStep = (arg: any) => {
    console.log('next step', arg);

    if (!arg) return;

    setActiveStep(steps[idx + 1]);
    setIdx(idx + 1);
  };

  const prevStep = () => {
    setActiveStep(steps[idx - 1]);
    setIdx(idx - 1);
  };

  const setStep = (n: number) => {
    setActiveStep(steps[n]);
    setIdx(n);
  };

  useEffect(() => {
    if (idx === steps.length - 1) {
      setShowDone(true);
    }
  }, [idx]);

  return (
    <motion.div
      className={s.container}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <motion.div className="container_wrapper">
        <LayoutGroup>
          {/*<ListingProgress idx={idx} />*/}

          <motion.div className="main_content">
            <Formik
              initialValues={initialValue}
              validateOnMount={false}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={nextStep}
              validationSchema={activeStep.schema}
            >
              {(formikProps) => (
                <Form>
                  <LayoutGroup>
                    <AnimatePresence exitBeforeEnter>
                      <motion.div
                        className="animator"
                        variants={wrapperVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={activeStep.name}
                        layout
                      >
                        {idx !== steps.length - 1 && showDone && (
                          <Button
                            variant="outlined"
                            className="done_btn"
                            color="warning"
                            onClick={() => setStep(steps.length - 1)}
                          >
                            Done
                          </Button>
                        )}

                        {activeStep.components({
                          controller: { nextStep, prevStep, setStep },
                          formikProps,
                        })}
                      </motion.div>
                    </AnimatePresence>

                    <div
                      style={{
                        position: 'absolute',
                        top: '0%',
                        left: '-30%',
                        maxWidth: '40ch',
                        fontSize: '.8rem',
                        pointerEvents: 'none',
                        display: 'none',
                        // display: idx != steps.length - 1 ? 'none' : 'block',
                      }}
                    >
                      <pre style={{ color: 'red' }}>
                        {JSON.stringify(formikProps.errors, null, 2)}
                      </pre>
                      <pre>{JSON.stringify(formikProps.values, null, 2)}</pre>
                    </div>

                    {idx != steps.length - 1 && (
                      <motion.div className={s.control_btn} layout>
                        {idx !== 0 && (
                          <Button
                            variant="contained"
                            className="in_btn"
                            size="large"
                            color="secondary"
                            onClick={() => prevStep()}
                          >
                            Back
                          </Button>
                        )}

                        <Button
                          variant="contained"
                          size="large"
                          className={clsx([{ [s.alone]: idx === 0 }])}
                          type="submit"
                          // onClick={() => nextStep()}
                        >
                          Next
                        </Button>
                      </motion.div>
                    )}
                  </LayoutGroup>
                </Form>
              )}
            </Formik>
          </motion.div>
        </LayoutGroup>
      </motion.div>
    </motion.div>
  );
};

export default ListingPage;
