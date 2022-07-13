import { LoadingButton } from "@mui/lab";
import * as Yup from 'yup'
import { FormControl,  FormGroup, FormLabel, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'
import { size } from "lodash";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { CheckboxWithLabel } from "formik-mui";
import Loader from "../../Loader/Loader"
import { guardarDocente } from "../../../api/docenteAPI";
import { getRoles } from "../../../api/rolAPI";
import { useAuth } from '../../../hooks';
import { docenteInitialValues, docenteValidationSchema } from "../../../utils/formValidation";

AddDocenteForm.propTypes={
    reset:PropTypes.func,
    onClose: PropTypes.func
}

export default function AddDocenteForm({reset, onClose}) {

    
    const [roles, setRoles] = useState([]);
    const { auth } = useAuth();

    const formik = useFormik({
        initialValues: { docenteInitialValues },
        validationSchema: Yup.object(docenteValidationSchema()),
        onSubmit: async (values, actions ) => {
            try{
                const response = await guardarDocente(values,auth?.token);
                if(response.status===201){
                    actions.resetForm();
                    toast.success("Docente guardado");
                    actions.setSubmitting(false);
                    reset();
                    onClose();
                }else{
                    const result=await response.json();
                    toast.error(result.mensaje);
                }

            }catch(error){
                console.log(error);
            }
        }
        
      });

    useEffect(() => {
        loadRol();
    }, [])

    const loadRol = async () => {
        const result = await getRoles(auth?.token);
        setRoles(result);
    }

    if(size(roles)<1) return <Loader/>

    /* return (
        <Formik
            initialValues={docenteInitialValues}
            validationSchema={Yup.object(docenteValidationSchema())}
            onSubmit={
               async (values, actions ) => {
                    try{
                        const response = await guardarDocente(values,auth?.token);
                        if(response.status===201){
                            actions.resetForm();
                            toast.success("Docente guardado");
                            actions.setSubmitting(false);
                            reset();
                            onClose();
                        }else{
                            const result=await response.json();
                            toast.error(result.mensaje);
                        }

                    }catch(error){
                        console.log(error);
                    }
                }
            }
        >
            {({ getFieldProps, touched, errors, isSubmitting }) => (
                <Form>
                    <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                fullWidth
                                label="Cédula"
                                {...getFieldProps('cedulaUsuario')}
                                error={Boolean(touched.cedulaUsuario && errors.cedulaUsuario)}
                                helperText={touched.cedulaUsuario && errors.cedulaUsuario}
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
                        <FormControl component="fieldset" style={{ display: "flex" }}>
                            <FormLabel component="legend">Roles</FormLabel>
                            <FormGroup style={{ display: "flex", }}
                            >
                                {roles.map(opt => (
                                    <Field
                                        style={{ color: "grey.300" }}
                                        type="checkbox"
                                        component={CheckboxWithLabel}
                                        name="roles"
                                        key={opt.idRol}
                                        value={opt.descripcion}
                                        Label={{ label: opt.descripcion.replace("ROLE_", "") }}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                            Registrar
                        </LoadingButton>
                    </Stack>
                </Form>
            )

            }

        </Formik>
    ) */
    

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                fullWidth
                                label="Cédula"
                                {...getFieldProps('cedulaUsuario')}
                                error={Boolean(touched.cedulaUsuario && errors.cedulaUsuario)}
                                helperText={touched.cedulaUsuario && errors.cedulaUsuario}
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
                            name="email"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <FormControl component="fieldset" style={{ display: "flex" }}>
                            <FormLabel component="legend">Roles</FormLabel>
                            <FormGroup style={{ display: "flex", }}
                            >
                                {roles.map(opt => (
                                    <Field
                                        style={{ color: "grey.300" }}
                                        type="checkbox"
                                        name="roles"
                                        key={opt.idRol}
                                        value={opt.descripcion} 
                                        component={CheckboxWithLabel}
                                        Label={{ label: opt.descripcion.replace("ROLE_","") }}               
                                    />
                                    
                                ))}
                            </FormGroup>
                        </FormControl>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                            Registrar
                        </LoadingButton>
                    </Stack>
                </Form>

        </FormikProvider>
    );
}