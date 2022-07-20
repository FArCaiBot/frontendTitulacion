import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { Form, FormikProvider, useFormik } from 'formik';
import { Stack, TextField } from '@mui/material';
import toast from "react-hot-toast";
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../../../hooks'
import { estadoAnteproyInitialValues, estadoAnteproyValidationSchema } from '../../../../utils/formValidation';
import Loader from '../../../Loader/Loader';
import { guardarEstAnt } from '../../../../api/estadosAPI';


AddEstAntForm.propTypes = {
    reset: PropTypes.func,
    onClose: PropTypes.func
}

export default function AddEstAntForm({ reset, onClose }) {
    const { auth } = useAuth();

    const formik = useFormik({
        initialValues: { estadoAnteproyInitialValues },
        validationSchema: Yup.object(estadoAnteproyValidationSchema()),
        onSubmit: async (values, actions) => {
            try {
                const response = await guardarEstAnt(values, auth?.token);
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
                        id="descripcion"
                        label="Descripción"
                        variant="outlined"
                        {...getFieldProps('descripcion')}
                        error={Boolean(touched.descripcion && errors.descripcion)}
                        helperText={touched.descripcion && errors.descripcion}
                    />
                    <TextField
                        id="observaciones"
                        label="Observaciones"
                        variant="outlined"
                        multiline
                        rows={2}
                        {...getFieldProps('observaciones')}
                        error={Boolean(touched.observaciones && errors.observaciones)}
                        helperText={touched.observaciones && errors.observaciones}
                    />
                    <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting}>
                        Guardar
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    )
}