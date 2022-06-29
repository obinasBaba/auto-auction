import React, { useState } from 'react';
import s from './listingpage.module.scss';
import AuctionRules from '@/scenes/ListingPage/AuctionRules';
import { LayoutGroup, motion } from 'framer-motion';
import ListingCreated from '@/scenes/ListingPage/ListingCreated';
import { Button } from '@mui/material';
import clsx from 'clsx';
import ListingProgress from '@/scenes/ListingPage/ListingProgress';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

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
    scale: 0.92,
  },
};

const types = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Minivan', 'Cabriolet'];
const makes = ['BMW', 'Audi', 'Lexus', 'Cadillac', 'Ford'];
const models = ['model-1', 'model-2', 'model-3', 'model-4'];
const engine = ['engine-1', 'engine-2', 'engine-3', 'engine-4'];
const color = ['color-1', 'color-2', 'color-3', 'color-4'];
const gearbox = ['manual', 'automatic'];

const steps = [
  /* {
     name: 'KIND',
     component: (props: any) => <WhatKindVehicle {...props} />,
     schema: yup.object({
       vin: yup.number().min(7).required('what is you vin'),
       type: yup
         .string()
         .required('you have to select the type of car you are listing -')
         .oneOf(types, 'you have to select the type of car you are listing'),
     }),
   },
   {
     name: 'FEATURE',
     component: (props: any) => <BasicFeatures {...props} />,
     schema: yup.object({
       make: yup
         .string()
         .oneOf(makes, 'select the manufacture of you vehicle!!'),
       model: yup.string().oneOf(models, 'select the Model of you vehicle!!'),
       color: yup.string().oneOf(color, 'select the color of you vehicle!!'),
       engine: yup
         .string()
         .oneOf(engine, 'select the Engine model of you vehicle!!'),
       gearbox: yup
         .string()
         .oneOf(gearbox, 'select the gearbox type of you vehicle!!'),
       year: yup
         .number()
         .positive('year need to be positive')
         .required('what year is your car?'),
       mileage: yup.number().min(4).required('mileage of you car?'),
     }),
   },
   {
     name: 'FEATURE_2',
     component: (props: any) => <AdditionalFeatures {...props} />,
     schema: yup.object({}),
   },

  {
    name: 'LOCATION',
    component: (props: any) => <VehicleLocation {...props} />,
    schema: yup.object({
      address: yup.object({
        state: yup.string().required('what is your location'),
        city: yup.string().required('what is your city'),
        streetAddress: yup.string().required('what is your streetAddress'),
        zipcode: yup.number().required('what is your zipcode'),
        apartmentNumber: yup.number().required('what is your home number'),
      }),
    }),
  },
  {
    name: 'PHOTOS',
    component: (props: any) => <VehiclePhoto {...props} />,
    schema: yup.array().of(
      yup.object({
        name: yup.string().required('name is required'),
        src: yup.string().required('url is required'),
      }),
    ),
  },
  {
    name: 'DESCRIPTION',
    component: (props: any) => <VehicleDescription {...props} />,
    schema: yup.object({
      listingTitle: yup.string().required('specify your listing Title'),
      description: yup.string().required('your description please'),
      price: yup.number(),
    }),
  },*/
  {
    name: 'RULE',
    component: (props: any) => <AuctionRules {...props} />,
    schema: yup.object({}),
  },
  {
    name: 'CREATED',
    component: (props: any) => <ListingCreated {...props} />,
    schema: yup.object({}),
  },
];

const ListingPage = () => {
  const [idx, setIdx] = useState(0);

  const [activeStep, setActiveStep] = useState<typeof steps[number]>({
    ...steps[0],
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
  };

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
        <ListingProgress />

        <motion.div className="main_content">
          <Formik
            initialValues={{
              vin: '',
              type: types[0],
              make: makes[0],
              engine: engine[0],
              model: models[0],
              gearbox: gearbox[0],
              color: color[0],
              year: 1990,
              mileage: 0,
              address: {
                state: '',
                city: '',
                streetAddress: '',
                apartmentNumber: '',
                zipcode: '',
              },
              images: [],
              listingTitle: '',
              description: '',
              price: 0,
            }}
            validateOnMount={false}
            validateOnChange={false}
            onSubmit={nextStep}
            validationSchema={steps[idx].schema}
          >
            {({ errors, values, setValues, setFieldValue }) => (
              <Form>
                <LayoutGroup id="unic">
                  <motion.div
                    className="animator"
                    variants={wrapperVariants}
                    key={activeStep.name}
                  >
                    {activeStep.component({
                      controller: { nextStep, prevStep, setStep },
                      values,
                      setValues,
                      setFieldValue,
                      errors,
                    })}

                    <div
                      style={{
                        position: 'absolute',
                        top: '10%',
                        right: '2%',
                        maxWidth: '40ch',
                        display: 'none',
                      }}
                    >
                      <pre style={{ color: 'red' }}>
                        {JSON.stringify(errors, null, 2)}
                      </pre>
                      <pre>{JSON.stringify(values, null, 2)}</pre>
                    </div>
                  </motion.div>

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
      </motion.div>
    </motion.div>
  );
};

export default ListingPage;
