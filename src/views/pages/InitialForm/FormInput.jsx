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

const FormInput = ({ ...others }) => {
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

  const handleContinue = async(values) => {
    const userData = JSON.parse(localStorage.getItem('userData')) || ''
    console.log("continue value ",{...values, company_size: (values?.company_size).toString() || '' ,  id: userData?.id})
    const reqData = {...values, company_size: (values?.company_size).toString() || '' ,  id: userData?.id}
   try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}companyProfile`, reqData)
   
    if(response?.status == 200) {
        console.log("profile ",response)
        const updatedUserData = {...userData, initial_user: response?.data?.initial_user ? true : false, company_profile: response?.data?.company_profile}
        console.log("updatedUserData ",updatedUserData)
        localStorage.setItem('userData', JSON.stringify(updatedUserData))
        navigate('/')
    } 
   } catch(error) {
    if(error?.status == 400) {
        localStorage.clear()
        navigate('/login')
    }
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
          client_name:'',
          company_size: '',
          about: '',
          company_linkedin_url:'',
          industry:'',
        }}
        validationSchema={Yup.object().shape({
            client_name: Yup.string().max(255).required('Name is required'),
            company_size: Yup.string().max(100).required('Company Size is required'),
            company_linkedin_url: Yup.string().max(255).required('Company Linkedin url is required'),
            industry: Yup.string().max(255).required('Industry Type is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form Values:", values);
          setSubmitting(false); // Stop submitting after form submission
          // Perform any further actions, such as sending values to an API
          handleContinue(values)
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.client_name && errors.client_name)} sx={{ ...theme.typography.customInput }}>
                    {/* <InputLabel htmlFor="outlined-adornment-client_name-register">Name</InputLabel> */}
                    <TextField
                        id="outlined-adornment-client_name-register"
                        type="text"
                        placeholder='Name'
                        value={values.client_name}
                        name="client_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                    />
                    {touched.client_name && errors.client_name && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.client_name}
                        </FormHelperText>
                    )}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.company_size && errors.company_size)} sx={{ ...theme.typography.customInput }}>
                    {/* <InputLabel htmlFor="outlined-adornment-company_size-register">Company Size</InputLabel> */}
                    <TextField
                        id="outlined-adornment-company_size-register"
                        type="number"
                        value={values.company_size}
                        name="company_size"
                        placeholder='Company Size'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                    />
                    {touched.company_size && errors.company_size && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.company_size}
                        </FormHelperText>
                    )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} >
                                
                    <FormControl fullWidth error={Boolean(touched.company_linkedin_url && errors.company_linkedin_url)} sx={{ ...theme.typography.customInput }}>
                    {/* <InputLabel htmlFor="outlined-adornment-company_linkedin_url-register">Company Linkedin Url</InputLabel> */}
                    <TextField
                        id="outlined-adornment-company_linkedin_url-register"
                        type="text"
                        placeholder='Linkedin Url'
                        value={values.company_linkedin_url}
                        name="company_linkedin_url"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                    />
                    {touched.company_linkedin_url && errors.company_linkedin_url && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.company_linkedin_url}
                        </FormHelperText>
                    )}
                    </FormControl>
                    </Grid >

                    <Grid item xs={12}>
                    <FormHelperText disabled>
                        Like IT,BPO, ITES - Services & Product - SaaS
                        </FormHelperText>
                    <FormControl fullWidth error={Boolean(touched.industry && errors.industry)} sx={{ ...theme.typography.customInput }}>
                    <TextField
                        id="outlined-adornment-industry-register"
                        type="text"
                        value={values.industry}
                        placeholder='Industry Type'
                        name="industry"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                    />
                     {touched.industry && errors.industry && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.industry}
                        </FormHelperText>
                    )}
                    
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                      
                    <FormControl fullWidth error={Boolean(touched.about && errors.about)} sx={{ ...theme.typography.customInput }}>
                    {/* <InputLabel htmlFor="outlined-adornment-about-register">About Company</InputLabel> */}
                    <TextField
                        id="outlined-adornment-about-register"
                        type="textArea"
                         placeholder='About'
                        value={values.about}
                        name="about"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                        multiline
                        rows={5}
                    />
                    {/* {touched.about && errors.about && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.about}
                        </FormHelperText>
                    )} */}
                    </FormControl>
                    
                </Grid>

                <Box sx={{ mt: 2, width:"100%", pl:'12px' }}>
                <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                    Continue
                    </Button>
                </AnimateButton>
                </Box>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormInput;
