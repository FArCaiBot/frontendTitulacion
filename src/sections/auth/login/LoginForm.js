import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { toast } from 'react-hot-toast';
import Iconify from '../../../components/Iconify';
import { loginAPI } from '../../../api/usuarioAPI';
import { useAuth } from "../../../hooks/useAuth";
import { loginInitialValues, loginValidationSchema } from '../../../utils/formValidation';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const { auth, login } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const formik = useFormik({
    initialValues: { loginInitialValues },
    validationSchema: Yup.object(loginValidationSchema()),
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const result = await loginAPI(values);
        login(result.tokenAcceso);

        actions.resetForm();
        if (auth) navigate("/");

      } catch (error) {
        toast.error("Credenciales incorrectas")
      }
      setLoading(false);

    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            required
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} loadingIndicator="Loading...">
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
