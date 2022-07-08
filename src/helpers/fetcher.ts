import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('next-auth.session-token');

export const fetcher = async (
  query: string,
  variables: any = {},
  fetchOptions: any = {},
) => {
  const token = getToken(); // accessing the cookie via js-cookie

  // console.log('token: ', query, variables);

  const res = await fetch('http://localhost:8000/graphql/', {
    ...fetchOptions,
    method: 'POST',
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors, status } = await res.json();

  if (errors) {
    console.error('error : ', errors, status);
  }

  return { data, res, errors };
};
