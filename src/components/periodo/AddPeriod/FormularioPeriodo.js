import { Stack, TextField } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale'
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { guardarPerido } from "../../../api/periodoAcademicoAPI";
import { periodInitialValues, periodValidationSchema } from '../../../utils/formValidation'
import { useAuth } from '../../../hooks'
import Loader from "../../Loader/Loader";

FormularioPeriodo.propTypes = {
    reset: PropTypes.func,
    onClose: PropTypes.func
}

export default function FormularioPeriodo({ reset, onClose, }) {

    const { auth } = useAuth();


    const formik = useFormik({
        initialValues: { periodInitialValues },
        validationSchema: Yup.object(periodValidationSchema()),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await guardarPerido(values, auth?.token);
                console.log(response);
                if (response) {
                    toast.success("Guardado");
                    reset();
                    onClose();
                    setSubmitting(false);
                }
            } catch (error) {
                console.error(error)
            }
        },
    });

    const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    if (!auth) return <Loader />

    return (
        <FormikProvider value={formik} >
            <Form autoComplete="off" onSubmit={handleSubmit} >
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        id="id"
                        label="ID"
                        variant="outlined"
                        {...getFieldProps('id')}
                        error={Boolean(touched.id && errors.id)}
                        helperText={touched.id && errors.id}
                    />
                    <TextField
                        id="anio"
                        label="Año"
                        variant="outlined"
                        type={"number"}
                        {...getFieldProps('anio')}
                        error={Boolean(touched.anio && errors.anio)}
                        helperText={touched.anio && errors.anio}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <DatePicker
                                inputFormat="yyyy/MM/dd"
                                mask="____/__/__"
                                label="Fecha de Inicio"
                                openTo="year"
                                {...getFieldProps('fechaInicio')}


                                onChange={(newValue) => {
                                    formik.setFieldValue("fechaInicio", newValue);

                                }}

                                renderInput={(params) => <TextField
                                    {...params}
                                    error={Boolean(touched.fechaInicio && errors.fechaInicio)}
                                    helperText={touched.fechaInicio && errors.fechaInicio}
                                />}
                            />
                            <DatePicker
                                inputFormat="yyyy/MM/dd"
                                mask="____/__/__"
                                label="Fecha de Fin"
                                minDate={formik.values.fechaInicio}
                                openTo="year"
                                {...getFieldProps('fechaInicio')}
                                value={formik.values.fechaFin}
                                onChange={(newValue) => {
                                    formik.setFieldValue("fechaFin", newValue);
                                }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={Boolean(touched.fechaFin && errors.fechaFin)}
                                    helperText={touched.fechaFin && errors.fechaFin}
                                />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <TextField
                        id="descripcionPeriodo"
                        label="Descripción"
                        multiline
                        rows={2}
                        variant="outlined"
                        {...getFieldProps('descripcionPeriodo')}
                        error={Boolean(touched.descripcionPeriodo && errors.descripcionPeriodo)}
                        helperText={touched.descripcionPeriodo && errors.descripcionPeriodo}

                    />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} >
                        Guardar
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider >
    );
}