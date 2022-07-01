import React from 'react';
import s from './layout.module.scss';
import Image from 'next/image';
import AppBar from '@/component/AppBar';
import DashBoardSideNav from '@/component/common/DashBoardSideNav';
import { useUI } from '@/context/ui/context';
import ModalView from '@/component/common/ModalView';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

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
  const { pathname, push } = useRouter();
  // const { data: session } = useSession();
  //
  // if (pathname.startsWith('/dashboard')) if (!session) push('/');

  return (
    <div className={s.container}>
      <AppBar />
      <div className="layout_content">
        {(pageProps.dashBoard || pathname.startsWith('/dashboard')) && (
          <DashBoardSideNav />
        )}

        <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
          {displayModal && <ModalView close={closeModal} />}
        </AnimatePresence>

        <main className={'main'} key={'main'}>
          <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
            {children}
          </AnimatePresence>
        </main>
      </div>
      <footer className={s.footer}>
        <nav>
          <div className="left">
            <p>Privacy Policy</p>
            <p>Term of Use</p>
            <p>@2022 All rights reserved</p>
          </div>
          <div className="right">
            <p>English</p>
            <p>top</p>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;
