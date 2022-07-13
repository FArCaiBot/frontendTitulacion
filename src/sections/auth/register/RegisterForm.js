import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { toast } from 'react-hot-toast';
import Iconify from '../../../components/Iconify';
import { registerAPI } from '../../../api/usuarioAPI';
import { registerInitialValues, registerValidationSchema } from '../../../utils/formValidation';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: { registerInitialValues },
    validationSchema: Yup.object(registerValidationSchema()),
    onSubmit: async (values, actions) => {
      try {
        const response = await registerAPI(values);
        if (response.status===201) {
          actions.resetForm();
          toast.success("Registrado con éxito");
          navigate("/login");
          actions.setSubmitting(false);
        }else{
          const result= await response.json()
          toast.error(result.mensaje)
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Cédula"
              {...getFieldProps('cedulaUsuario')}
              error={Boolean(touched.cedulaUsuario && errors.cedulaUsuario)}
              helperText={touched.cedulaUsuario && errors.cedulaUsuario}
            />
            <TextField
              fullWidth
              label='Código'
              {...getFieldProps('codigo')}
              error={Boolean(touched.codigo && errors.codigo)}
              helperText={touched.codigo && errors.codigo}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nombres"
              {...getFieldProps('nombres')}
              error={Boolean(touched.nombres && errors.nombres)}
              helperText={touched.nombres && errors.nombres}
            />

            <TextField
              fullWidth
              label="Apellidos"
              {...getFieldProps('apellidos')}
              error={Boolean(touched.apellidos && errors.apellidos)}
              helperText={touched.apellidos && errors.apellidos}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
