import React, { useEffect, useState } from 'react';
import s from './pending.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Divider, Stack } from '@mui/material';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import Image from 'next/image';
import { useSnackbar } from 'notistack';

const NEW_MERCHANTS = gql`
  query {
    merchantList {
      email
      verified
      id
      userId
      createdAt
      licenceUrl
    }
  }
`;

const MERCHANT_VERIFY = gql`
  mutation ($input: MerchantVerifyInput!) {
    merchantVerify(input: $input) {
      errors {
        message
      }
      merchant {
        id
        userId
        licenceUrl
        verified
      }
    }
  }
`;

const Pending = ({ verifiedOnly }: any) => {
  const { currentUser } = useAppContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pendingUser, setPendingUser] = useState<any[]>([]);
  const [verify, { data: dataMu, error: errorMu, loading: loadingMu }] =
    useMutation(MERCHANT_VERIFY);

  const { data, loading, error, refetch } = useQuery(NEW_MERCHANTS, {
    initialFetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    skip: !currentUser?.id,
    variables: {},
  });

  useError(error, data);
  useError(errorMu, dataMu);

  useEffect(() => {
    if (data) {
      setPendingUser(data?.merchantList);
      console.log('merchants data ;', data);
    }
  }, [data, loading]);

  useEffect(() => {
    if (dataMu) {
      console.log('merchants data ;', dataMu);
    }
  }, [dataMu, loadingMu]);

  return (
    <div className={s.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>User Name</h3>
              </TableCell>
              <TableCell align="left">
                <h3>Email</h3>
              </TableCell>
              <TableCell align="left">
                <h3> Created At</h3>
              </TableCell>
              <TableCell align="left">
                <h3> Licence</h3>
              </TableCell>
              <TableCell align="right">
                <h3>Action </h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingUser
              .filter(({ verified }) => verified == verifiedOnly)
              .map(
                (
                  { email, verified, id, userId, createdAt, licenceUrl },
                  idx,
                ) => (
                  <TableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {email.slice(0, 5)}
                    </TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{createdAt}</TableCell>
                    <TableCell align="left">
                      <div className="licence_img">
                        <a href={licenceUrl} target="_blank" rel="noreferrer">
                          <Image
                            src={licenceUrl}
                            objectFit="cover"
                            layout="fill"
                            alt="licence image"
                          />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => {
                            verify({
                              variables: {
                                input: {
                                  merchantId: id,
                                },
                              },
                            })
                              .then(({ data, errors }) => {
                                console.log('verify data: ', data, errors);
                                if (data?.merchantVerify?.merchant) {
                                  refetch().then(() => {
                                    enqueueSnackbar(
                                      `user - ${id} is now verified!`,
                                      {
                                        variant: 'success',
                                      },
                                    );
                                  });
                                }
                              })
                              .catch(JSON.stringify);
                          }}
                        >
                          Accept
                        </Button>
                        <Button variant="outlined" size="small" color="error">
                          Reject
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ),
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Pending;
