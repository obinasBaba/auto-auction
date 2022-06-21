import React from 'react';
import s from './layout.module.scss';
import Image from 'next/image';
import AppBar from '@/component/AppBar';
import DashBoardSideNav from '@/component/common/DashBoardSideNav';
import { useUI } from '@/component/ui/context';
import ModalView from '@/component/common/ModalView';

type LayoutProps = {
  children: React.ReactNode;
  pageProps: any;
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? <ModalView /> : null;
};

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  return (
    <div className={s.container}>
      <AppBar />

      <div className="content">
        {pageProps.dashBoard && <DashBoardSideNav />}

        <ModalUI />

        <main className={'main'}>{children}</main>
      </div>

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
