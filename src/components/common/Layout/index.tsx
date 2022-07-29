import React, { useEffect } from 'react';
import s from './layout.module.scss';
import DashBoardSideNav from '@/components/common/DashBoardSideNav';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import ProfileHeaderInfo from '@/components/common/Layout/components/ProfileHeaderInfo';
import FixedLayer from '@/components/FixedLayer';
import { useAppContext } from '@/context';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import Logo from '@/public/logo.svg';

type LayoutProps = {
  children: React.ReactNode;
  pageProps: any;
};

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const { pathname, push } = useRouter();
  const router = useRouter();
  const { currentUser } = useAppContext();

  useEffect(() => {
    if (router.pathname.startsWith('/dashboard') && !currentUser) {
      // router.push('/');
    }
  }, [currentUser, router]);

  return (
    <div className={s.root}>
      <FixedLayer />

      <div className="layout_content">
        {(pageProps.dashBoard || pathname.startsWith('/dashboard')) &&
          currentUser?.id && <DashBoardSideNav />}

        <main className="main" key="main">
          {pageProps.headerInfo && (
            <ProfileHeaderInfo headerInfo={pageProps.headerInfo} />
          )}

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

          <Link href="/">
            <a className="logo">
              <Avatar src={Logo.src} className="logo" />
            </a>
          </Link>

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
