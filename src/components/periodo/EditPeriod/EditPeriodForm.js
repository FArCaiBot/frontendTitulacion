import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {es} from 'date-fns/locale'
import { LoadingButton } from "@mui/lab";
import toast from 'react-hot-toast';
import { periodValidationSchema } from '../../../utils/formValidation';
import {useAuth} from '../../../hooks'
import Loader from '../../Loader/Loader'
import { actualizarPeriodo } from '../../../api/periodoAcademicoAPI';

EditPeriodForm.propTypes = {
    reset: PropTypes.func,
    onClose: PropTypes.func,
    data: PropTypes.array
}

export default function EditPeriodForm({ reset, onClose, data }) {
    
    const {auth}=useAuth();

    const formik = useFormik({
        initialValues: {
            id: data.id,
            anio:  data.anio ,
            fechaInicio: new Date(data.fechaInicio),
            fechaFin: new Date(data.fechaFin),
            descripcionPeriodo: data.descripcionPeriodo
        },
        validationSchema: Yup.object(periodValidationSchema()),
        onSubmit: async (values, actions) => {
            try{
                const response=await actualizarPeriodo(data.id,values,auth?.token)
                console.log(response);
                if(response){
                    toast.success("Cambios guardados");
                    reset();
                    onClose();
                    actions.resetForm();
                    actions.setSubmitting(false);
                }
            }catch(error){
                console.log(error);
            }
        }
    })

    const {errors, touched, isSubmitting, handleSubmit, getFieldProps}=formik

    
    if(!auth) return <Loader/>    

    return (
        <FormikProvider value={formik} sx>
            <Form autoComplete='off' onSubmit={handleSubmit}>
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

                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <DatePicker
                                inputFormat="yyyy/MM/dd"
                                mask="____/__/__"
                                label="Fecha de Inicio"
                                openTo="year"
                                views={['year', 'month', 'day']}
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
                                openTo="year"
                                views={['year', 'month', 'day']}
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
        </FormikProvider>
    )

}