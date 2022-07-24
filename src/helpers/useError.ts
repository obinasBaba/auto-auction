import { useEffect } from 'react';

export default function useError(error: any) {
  useEffect(() => {
    console.log('useError report :: ', JSON.stringify(error, null, 2));
  }, [error]);
}
