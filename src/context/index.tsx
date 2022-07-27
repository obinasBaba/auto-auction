import React, { FC, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useQuery,
  useSubscription,
} from '@apollo/client';
import { USER_TOKEN } from '@/const';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

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
      merchantId
      verified
      isAdmin
      permission
    }
  }
`;

const MERCHANT_VERIFIED = gql`
  subscription ($userId: ID!) {
    merchantVerified(userId: $userId) {
      id
      userId
      verified
      licenceUrl
      permission
    }
  }
`;

export const AppProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [uId, setUid] = useState<any>(true);

  const {
    client,
    data: currentUser,
    error,
    loading,
    refetch,
  } = useQuery(GET_USER, {
    nextFetchPolicy: 'network-only',
    initialFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    refetchWritePolicy: 'overwrite',
  });

  const {
    data: subData,
    error: subError,
    loading: subLoading,
  } = useSubscription(MERCHANT_VERIFIED, {
    skip: !currentUser?.me?.id,
    shouldResubscribe: true,
    variables: {
      userId: currentUser?.me?.id,
    },
  });

  useEffect(() => {
    console.log('Me-data: ', currentUser, error, loading);
  }, [currentUser, error, loading]);

  useEffect(() => {
    console.log('verified subscribtion ----- ', subData, subError, subLoading);
    if (subError) {
      console.log(JSON.stringify(subError, null, 2));
    }
    if (subData?.merchantVerified) {
      refetch();

      if (subData.merchantVerified?.permission === 'accepted') {
        enqueueSnackbar('Your business account is verified', {
          variant: 'success',
        });
      } else if (subData.merchantVerified?.permission === 'rejected') {
        enqueueSnackbar('Your business account is Rejected', {
          variant: 'error',
        });
      }
    }
  }, [subData, subError, subLoading]);

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
        currentUser: currentUser?.me || {},
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
    currentUser: Record<string, any>;
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
