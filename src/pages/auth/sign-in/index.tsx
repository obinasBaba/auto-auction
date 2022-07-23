import React, { useEffect } from 'react';
import s from './signin.module.scss';
import SignInModal from '@/components/common/RegistrationModal/SignInModal';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

const SignIn = ({}) => {
  const { callbackUrl, error } = useRouter().query;
  const { pathname, query } = useRouter();

  const { data: session, status } = useSession();

  console.log('query: ', query);

  useEffect(() => {
    if (!session) void signIn('google');
    else if (error || callbackUrl || query) {
      window.prompt(`${error} - ${callbackUrl}, ${query} -- what si `);
    } else window.close();
  }, [session, status]);

  useEffect(() => {
    return;
    console.log('useEffect---');

    async function foo() {
      const res: any = await signIn('google');
      // if (false)
      window.prompt(res?.toString(), 'promting: ' + pathname);
    }

    foo();
  }, []);

  // return ReactDOM.createPortal( <h1>this is inside portal</h1>, count.current);

  return null;

  return (
    <div className={s.container}>
      {/*<Typography variant="h2"> SIGN IN {count.current++} </Typography>*/}

      <pre>{JSON.stringify({ callbackUrl, error }, null, 2)}</pre>

      <SignInModal />
    </div>
  );
};

export default SignIn;
