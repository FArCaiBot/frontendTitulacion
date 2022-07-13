import { LoadingButton } from "@mui/lab";
import { Box, CardHeader, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Form, FormikProvider, useFormik, yupToFormErrors } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { useAuth } from "../../hooks";
import { changePassword } from "../../api/usuarioAPI";
import { changePasswordInitialValues, changePasswordValidationSchema } from '../../utils/formValidation';
import Iconify from "../Iconify";

export default function ChangePassword() {
    const { auth } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const formik = useFormik({
        initialValues: { changePasswordInitialValues },
        validationSchema: Yup.object(changePasswordValidationSchema()),
        onSubmit: async (values, actions) => {
            try {
                const response = await changePassword(auth.userData.idUsuario, values.password, auth?.token);
                if (response.status === 200) {
                    actions.resetForm();
                    toast.success("Contraseña actualizada");
                    actions.setSubmitting(false);
                }else{
                    const result=await response.json(); 
                    toast.error(result.mensaje);
                }
            } catch (error) {
                console.log(error);
            }
        }

    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
        <Box sx={{ pt: 3 }}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <CardHeader
                            title="Cambiar contraseña"
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
                                        <IconButton onClick={handleShowPassword} edge="end">
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
                            Actualizar
                        </LoadingButton>

                    </Stack>

                </Form>

            </FormikProvider>
        </Box>
    );

}