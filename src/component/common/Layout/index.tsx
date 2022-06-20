import React from 'react';
import s from './layout.module.scss';
import Image from 'next/image';

type LayoutProps = {
  children: React.ReactNode;
  pageProps: any;
};

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  return (
    <div className={s.container}>
      <main className={s.main}>{children}</main>

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
