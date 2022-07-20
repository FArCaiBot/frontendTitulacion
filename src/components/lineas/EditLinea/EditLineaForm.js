import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { Form, FormikProvider, useFormik } from 'formik';
import { Stack, TextField } from '@mui/material';
import toast from "react-hot-toast";
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../../hooks'
import { lineaInvestigacionInitialValues, lineaInvestigacionValidationSchema } from '../../../utils/formValidation';
import Loader from '../../Loader/Loader';
import { actualizarLinea } from '../../../api/lineaAPI';


EditLineaForm.propTypes = {
    reset: PropTypes.func,
    onClose: PropTypes.func
}

export default function EditLineaForm({ reset, onClose, data }) {
    const { auth } = useAuth();

    const formik = useFormik({
        initialValues: {
            codigo: data.codigo,
            lineaInvestigacion: data.lineaInvestigacion
        },
        validationSchema: Yup.object(lineaInvestigacionValidationSchema()),
        onSubmit: async (values, actions) => {
            try {
                const response = await actualizarLinea(data.codigo, values, auth?.token);
                if (response.status === 200) {
                    actions.resetForm();
                    toast.success("Estado actualizado");
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