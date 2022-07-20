import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { Form, FormikProvider, useFormik } from 'formik';
import { Stack, TextField } from '@mui/material';
import toast from "react-hot-toast";
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../../hooks'
import { lineaInvestigacionInitialValues, lineaInvestigacionValidationSchema } from '../../../utils/formValidation';
import Loader from '../../Loader/Loader';
import { guardarLinea } from '../../../api/lineaAPI';


AddLineaForm.propTypes = {
    reset: PropTypes.func,
    onClose: PropTypes.func
}

export default function AddLineaForm({ reset, onClose }) {
    const { auth } = useAuth();

    const formik = useFormik({
        initialValues: { lineaInvestigacionInitialValues },
        validationSchema: Yup.object(lineaInvestigacionValidationSchema()),
        onSubmit: async (values, actions) => {
            try {
                const response = await guardarLinea(values, auth?.token);
                if (response.status === 201) {
                    actions.resetForm();
                    toast.success("Estado guardado");
                    actions.setSubmitting(false);
                    reset();
                    onClose();
                } else {
                    const result = await response.json();
                    toast.error(result.mensaje);
                }
            } catch (error) {
                console.error(error);
            }
        }

    });

    const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    if (!auth) return <Loader />

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        id="codigo"
                        label="Código"
                        variant="outlined"
                        {...getFieldProps('codigo')}
                        error={Boolean(touched.codigo && errors.codigo)}
                        helperText={touched.codigo && errors.codigo}
                    />
                    <TextField
                        id="lineaInvestigacion"
                        label="Linea de investigación"
                        variant="outlined"
                        autoCapitalize=''
                        {...getFieldProps('lineaInvestigacion')}
                        error={Boolean(touched.lineaInvestigacion && errors.lineaInvestigacion)}
                        helperText={touched.lineaInvestigacion && errors.lineaInvestigacion}
                    />
                    <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting}>
                        Guardar
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    )
}