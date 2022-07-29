import React, { useEffect, useState } from 'react';
import s from './managerslist.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAppContext } from '@/context';
import useError from '@/helpers/useError';
import { useSnackbar } from 'notistack';
import { SignUpHeader } from '@/components/common/RegistrationModal/components';
import { Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';

const NEW_MERCHANTS = gql`
  query {
    merchantList {
      email
      verified
      id
      userId
      createdAt
      licenceUrl
      permission
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 2,
};

const GenerateAccountForm = () => {
  const [values, setValues] = React.useState<any>({
    showPassword: true,
  });

  const formik = useFormik({
    initialValues: {
      email: 'admin@gmail.com',
      password: '123456',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('value: ', values);
    },
  });

  return (
    <div className="sign_in_wrapper">
      <div className="content">
        <form className="form" onSubmit={formik.handleSubmit}>
          <SignUpHeader text="Generate Manager Account" />

          <TextField
            id="email"
            label="Email"
            type="email"
            required
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="password"
            label="Password"
            type={values.showPassword ? 'text' : 'password'}
            required
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={(_) =>
                      setValues({ showPassword: !values.showPassword })
                    }
                    // edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            className="in_btn"
            size="large"
            type="submit"
          >
            Generate
          </Button>
        </form>
      </div>
    </div>
  );
};

const Pending = ({ verifiedOnly, permissionValue }: any) => {
  const { currentUser } = useAppContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pendingUser, setPendingUser] = useState<any[]>([]);
  const [verify, { data: dataMu, error: errorMu, loading: loadingMu }] =
    useMutation(MERCHANT_VERIFY);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, loading, error, refetch } = useQuery(NEW_MERCHANTS, {
    initialFetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    // skip: !currentUser?.id,
    pollInterval: 1,
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
              <TableCell align="right">
                <h3>Action </h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingUser
              // .filter(({ permission }) => permission == permissionValue)
              .map(
                (
                  {
                    email,
                    verified,
                    id,
                    userId,
                    createdAt,
                    licenceUrl,
                    permission,
                  },
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
                    <TableCell align="left">{createdAt} </TableCell>

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
                                  value: 'accepted',
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
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => {
                            verify({
                              variables: {
                                input: {
                                  merchantId: id,
                                  value: 'rejected',
                                },
                              },
                            })
                              .then(({ data, errors }) => {
                                console.log('verify data: ', data, errors);
                                if (data?.merchantVerify?.merchant) {
                                  refetch().then(() => {
                                    enqueueSnackbar(
                                      `user - ${id} is now Rejected!`,
                                      {
                                        variant: 'warning',
                                      },
                                    );
                                  });
                                }
                              })
                              .catch(JSON.stringify);
                          }}
                        >
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

      <div className="admin_actions">
        <Button variant="outlined" size="large" onClick={handleOpen}>
          Generate New Account
        </Button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={s.modal_container}>
            <GenerateAccountForm />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Pending;
