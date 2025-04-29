import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios"

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate()

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  const handleSignup = async(values) => {
    let reqData = {...values, role_id:1}
    console.log('env ',import.meta.env.VITE_APP_BASE_URL+'signup', reqData)
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}signup`, reqData)
      console.log("response signup ",response)
      if(response?.status == 201) {
        navigate('/login')
      }
    } catch(err) {
      console.log("erro ",err)
    }
   
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          name:'',
          email: '',
          password: '',
          phone:'',
          linkedin_url:'',
          website:'',
          address:'',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          phone: Yup.string()
          .matches(/^\d+$/, "Phone number must be numeric")
          .max(10, "Phone number can't exceed 10 digits")
          .min(10, "Phone number should be 10 digits")
          .required('Phone is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form Values:", values);
          setSubmitting(false); // Stop submitting after form submission
          // Perform any further actions, such as sending values to an API
          handleSignup(values)
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
              <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name-register">Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-register"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            
            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-phone-register">Phone</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone-register"
                type="text"
                value={values.phone}
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.phone && errors.phone && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.phone}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.linkedin_url && errors.linkedin_url)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-linkedin_url-register">Linkedin Url</InputLabel>
              <OutlinedInput
                id="outlined-adornment-linkedin_url-register"
                type="text"
                value={values.linkedin_url}
                name="linkedin_url"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
             
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.website && errors.website)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-website-register">Website Url</InputLabel>
              <OutlinedInput
                id="outlined-adornment-website-register"
                type="text"
                value={values.website}
                name="website"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
             
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-address-register">Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-address-register"
                type="text"
                value={values.address}
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
                // multiline
                maxRows={5}
              />
             
            </FormControl>

            {/* <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid> */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
