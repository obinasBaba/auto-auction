import React from 'react';
import s from './layout.module.scss';
import Image from 'next/image';
import AppBar from '@/component/AppBar';
import DashBoardSideNav from '@/component/common/DashBoardSideNav';
import { useUI } from '@/component/ui/context';
import ModalView from '@/component/common/ModalView';
import { AnimatePresence } from 'framer-motion';

type LayoutProps = {
  children: React.ReactNode;
  pageProps: any;
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? <ModalView close={closeModal} /> : null;
};

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const { displayModal, closeModal, modalView } = useUI();

  return (
    <div className={s.container}>
      <AppBar />
      <div className="layout_content">
        {pageProps.dashBoard && <DashBoardSideNav />}

        <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
          {displayModal && <ModalView close={closeModal} />}
        </AnimatePresence>

        <main className={'main'} key={'main'}>
          <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
            {children}
          </AnimatePresence>
        </main>
      </div>
      layout
      <footer className={s.footer}>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={s.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
