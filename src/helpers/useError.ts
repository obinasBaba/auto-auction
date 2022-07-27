import { useEffect } from 'react';
import { ApolloError } from '@apollo/client';
import { useSnackbar } from 'notistack';

export default function useError(
  error: ApolloError | undefined,
  dataError: any | undefined,
) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    console.log('useError report :: ', JSON.stringify(error, null, 2));

    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }

    if (dataError?.error) {
      enqueueSnackbar(dataError?.error, { variant: 'error' });
    }
  }, [error, dataError]);
}
