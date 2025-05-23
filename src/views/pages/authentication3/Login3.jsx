import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

import { useNavigate } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('candidate');

  useEffect(() => {
    if (token) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!loading && (
        <AuthWrapper1>
          <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                  <AuthCardWrapper>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                      <Grid item sx={{ mb: 3 }}>
                        <Link to="#" aria-label="logo">
                          <Logo />
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                          <Grid item>
                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                              <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                                Login
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent="center" sx={{ marginBlock: '20px' }}>
                          <Grid item>
                            <Tabs
                              value={value}
                              onChange={handleChange}
                              textColor="secondary"
                              indicatorColor="secondary"
                              aria-label="secondary tabs example"
                            >
                              <Tab value="candidate" label="Candidate" />
                              <Tab value="client" label="Client" />
                            </Tabs>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <AuthLogin />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container direction="column" alignItems="center" xs={12}>
                          <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                            Don&apos;t have an account?
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AuthCardWrapper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
              {/* <AuthFooter /> */}
            </Grid>
          </Grid>
        </AuthWrapper1>
      )}
    </>
  );
};

export default Login;
