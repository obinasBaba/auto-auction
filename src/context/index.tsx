import React, { FC, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { gql, useQuery } from '@apollo/client';

export interface State {
  pathname: string;
}

const initialState = {
  pathname: 'sld',
};

type Action = {
  type: 'NOT_IMP';
};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'NOT_IMP': {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

const GET_USER = gql`
  query Me {
    me {
      id
      firstName
      LastName
      email
    }
  }
`;

export const AppProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const {
    client,
    data: currentUser,
    error,
    loading,
    refetch,
  } = useQuery(GET_USER, {});
  const [session, setSession] = useState();

  useEffect(() => {
    console.log('Medata: ', currentUser, error, loading);
  }, [currentUser, error, loading]);

  const value = useMemo(
    () => ({
      ...state,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return (
    <UIContext.Provider
      value={{ ...value, client, currentUser: currentUser?.me, refetch }}
      {...props}
    />
  );
};

export const useAppContext = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};

export const AppContext: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  /*  const { pathname, push } = useRouter();
  const { data: session } = useSession();

  useLayoutEffect(() => {
    console.log('pathname: ', pathname, 'sess: ', session);
    if (pathname.startsWith('/dashboard')) if (!session) push('/');
  }, [pathname]);*/

  return (
    <AppProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppProvider>
  );
};
