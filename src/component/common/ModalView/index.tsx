import React, { useState } from 'react';
import s from './modalview.module.scss';

import { motion } from 'framer-motion';
import {
  blurVariants,
  containerVariants,
  modalVariants,
} from '@/component/common/ModalView/variants';
import SignUpModal from '@/component/common/ModalView/SignUpModal';
import SignInModal from '@/component/common/ModalView/SignInModal';
import ConfirmationModal from '@/component/common/ModalView/ConfirmationModal';

type ModalViewType = {
  close: () => void;
  children?: React.ReactElement;
};

type Modals = 'SIGN_UP' | 'CONFIRMATION' | 'SIGN_IN';

const ModalView: React.FC<ModalViewType> = ({ close }) => {
  const [activeModal, setActiveModal] = useState<{ name: Modals }>({
    name: 'SIGN_IN',
  });

  const switchModal = (name: Modals) => {
    setActiveModal({ name });
  };

  return (
    <motion.div
      className={s.container}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="blur" onClick={close} variants={blurVariants} />

      <motion.div
        className="wrapper"
        variants={modalVariants}
        key={activeModal.name}
      >
        {activeModal.name === 'SIGN_UP' ? (
          <SignUpModal switchModal={switchModal} />
        ) : activeModal.name === 'SIGN_IN' ? (
          <SignInModal switchModal={switchModal} />
        ) : (
          activeModal.name === 'CONFIRMATION' ?? <ConfirmationModal />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModalView;
