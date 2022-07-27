import React, { useEffect } from 'react';
import s from './fixedlayer.module.scss';
import AppBar from '@/components/AppBar';
import { AnimatePresence } from 'framer-motion';
import RegistrationModal from '@/components/common/RegistrationModal';
import { useUI } from '@/context/ui/context';

const FixedLayer = () => {
  const { displayModal, closeModal, modalView } = useUI();

  useEffect(() => {
    console.log('displayModal:', displayModal);
  }, [displayModal]);

  return (
    <div className={s.container}>
      <AppBar />

      <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
        {displayModal && <RegistrationModal close={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default FixedLayer;
