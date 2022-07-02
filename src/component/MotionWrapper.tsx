import { motion } from 'framer-motion';
import React from 'react';

export const featureWrapperVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
export const MotionWrapper = ({
  children,
  variants = featureWrapperVariant,
  ...props
}: any) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={variants}
    {...props}
  >
    {children}
  </motion.div>
);
