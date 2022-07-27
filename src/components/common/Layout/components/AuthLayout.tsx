import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';

const AuthLayout = ({ children }: any) => {
  const { pathname, push } = useRouter();
  const router = useRouter();
  const { currentUser } = useAppContext();

  return <div></div>;
};

export default AuthLayout;
