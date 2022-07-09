import React from 'react';
import s from './progresscircle.module.scss';
import { motion, useTransform } from 'framer-motion';

const ProgressCircle = ({ progress, ...props }: any) => {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);
  // const pathLength = useTransform(new MotionValue(.7), [0, 1], [0, 1]);

  return (
    <div className={s.container} {...props}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M46.5 24C46.5 36.4264 36.4264 46.5 24 46.5C11.5736 46.5 1.5 36.4264 1.5 24C1.5 11.5736 11.5736 1.5 24 1.5C36.4264 1.5 46.5 11.5736 46.5 24Z"
          stroke="lightgray"
          strokeWidth="3"
          // style={{ pathLength: 1 }}
        />
        <motion.path
          d="M46.5 24C46.5 36.4264 36.4264 46.5 24 46.5C11.5736 46.5 1.5 36.4264 1.5 24C1.5 11.5736 11.5736 1.5 24 1.5C36.4264 1.5 46.5 11.5736 46.5 24Z"
          stroke="#7963F0"
          strokeWidth="3"
          style={{ pathLength }}
        />
      </motion.svg>
    </div>
  );
};

export default ProgressCircle;
