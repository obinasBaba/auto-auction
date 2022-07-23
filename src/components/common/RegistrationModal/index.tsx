import React, { useState } from 'react';
import s from './regestration.module.scss';

import { motion } from 'framer-motion';
import {
  blurVariants,
  containerVariants,
  modalVariants,
} from '@/components/common/RegistrationModal/variants';
import SignInModal from '@/components/common/RegistrationModal/SignInModal';

import Car from '@/public/car2.jpg';
import Image from 'next/image';
import { useUI } from '@/context/ui/context';
import SignUpModal from '@/components/common/RegistrationModal/SignUpModal';

type ModalViewType = {
  close: () => void;
  children?: React.ReactElement;
};

type Modals = 'SIGN_UP' | 'CONFIRMATION' | 'SIGN_IN';

const RegistrationModal: React.FC<ModalViewType> = ({ close }) => {
  const { displayModal, closeModal, modalView } = useUI();

  const [signIn, setSignIn] = useState<boolean>(false);

  const switchModal = () => {
    setSignIn(!signIn);
  };

  return (
    <motion.div
      className={s.container}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="blur"
        onClick={() => closeModal()}
        variants={blurVariants}
      />

      <motion.div
        className="wrapper"
        variants={modalVariants}
        key={signIn.toString()}
      >
        <motion.div className="art" layout>
          <motion.div className="img" layout>
            <Image src={Car} alt="side img" objectFit="cover" />
          </motion.div>
          <div className="overlay">/</div>
        </motion.div>

        {signIn ? (
          <SignInModal switchModal={switchModal} />
        ) : (
          <SignUpModal switchModal={switchModal} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default RegistrationModal;
