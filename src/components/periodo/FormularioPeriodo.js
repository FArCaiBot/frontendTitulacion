import { Stack, TextField } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { guardarPerido } from "../../api/periodoAcademicoAPI";


export default function FormularioPeriodo({ reset, onClose }) {

    const LoginSchema = Yup.object().shape({
        anio: Yup
            .number()
            .required("El campo es obligatorio")
            .positive("El año debe ser un número positivo")
            .max(new Date().getFullYear() + 1, "El año no puede ser mayor al año actual + 1"),
        fechaInicio: Yup
            .date()
            .nullable("El campo no puede estar vacio")
            .required("El campo es obligatorio"),
        fechaFin: Yup
            .date()
            .nullable()
            .required("El campo es obligatorio"),
        descripcionPeriodo: Yup
            .string()
            .required("El campo es obligatorio")
            .min(10, "El campo debe tener entre 10 y 60 caracteres")
            .max(60, "El campo debe tener entre 10 y 60 caracteres")
    });

    const formik = useFormik({
        initialValues: {
            anio: '',
            fechaInicio: null,
            fechaFin: null,
            descripcionPeriodo: ''
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await guardarPerido(values);
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


    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik} sx>
            <Form autoComplete="off" onSubmit={handleSubmit} >
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        id="anio"
                        label="Año"
                        variant="outlined"
                        type={"number"}
                        {...getFieldProps('anio')}
                        error={Boolean(touched.anio && errors.anio)}
                        helperText={touched.anio && errors.anio}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <DatePicker
                                inputFormat="yyyy/MM/dd"
                                mask="____/__/__"
                                label="Fecha de Inicio"

                                {...getFieldProps('fechaInicio')}
                                value={formik.values.fechaInicio}

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
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Guardar
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider >
    );
}