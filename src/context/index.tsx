import React, { FC, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'next-themes';
import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import { USER_TOKEN } from '@/const';
import { useRouter } from 'next/router';

export interface State {
  businessAccount: boolean;
}

const initialState = {
  businessAccount: false,
};

type Action = {
  type: 'SWITCH_BUSINESS' | 'LOGOUT_BUSINESS';
};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SWITCH_BUSINESS': {
      return {
        ...state,
        businessAccount: true,
      };
    }
    case 'LOGOUT_BUSINESS': {
      return {
        ...state,
        businessAccount: false,
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
  } = useQuery(GET_USER, { nextFetchPolicy: 'network-only' });
  const router = useRouter();

  useEffect(() => {
    console.log('Medata: ', currentUser, error, loading);
  }, [currentUser, error, loading]);

  const switchToBusiness = () => dispatch({ type: 'SWITCH_BUSINESS' });
  const logoutBusiness = () => dispatch({ type: 'SWITCH_BUSINESS' });

  const logOut = () => {
    sessionStorage.removeItem(USER_TOKEN);
    refetch().then(() => {
      router.push('/');
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      switchToBusiness,
      logoutBusiness,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return (
    <UIContext.Provider
      value={{
        ...value,
        client,
        currentUser: currentUser?.me,
        refetch,
        logOut,
      }}
      {...props}
    />
  );
};

export const useAppContext = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context as State & {
    switchToBusiness: () => void;
    logoutBusiness: () => void;
    logOut: () => void;
    currentUser?: Record<string, any>;
    refetch: (
      variables?: Partial<OperationVariables> | undefined,
    ) => Promise<ApolloQueryResult<any>>;
  };
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
