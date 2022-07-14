import * as Yup from "yup";

const lowercaseRegex = /(?=.*[a-x])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /[!@#$%^&*()]+/;
const onlyNumbers = /^([0-9])*$/;
const onlyLetters = /^[a-z]+$/gi;
const string = /^[a-zA-Z\s]*$/;


/* LOGIN values and validation */
export function loginInitialValues() {
    return {
        email: "",
        password: "",
    };
}

export function loginValidationSchema() {
    return {
        email: Yup.string()
            .strict(true)
            .required("Ingresa tu correo por favor!")
            .email("El formato del correo no es correcto"),
        password: Yup.string()
            .strict(true)
            .required("Ingresa tu contraseña por favor!")
            .min(4, "La contraseña debe tener más de 8 carácteres"),
    };
}

/* Register values and validation */
export function registerInitialValues() {
    return {
        cedulaUsuario: '',
        codigo: '',
        nombres: '',
        apellidos: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
}

export function registerValidationSchema() {
    return {
        cedulaUsuario: Yup.string().strict(true)
            .min(10, "Debe contener 10 caracteres")
            .required('Campo requerido')
            .matches(onlyNumbers, "Solo debe incluir numeros"),
        codigo: Yup.string()
            .min(4, "Debe contener 4 caracteres")
            .required('Campo requerido')
            .matches(onlyNumbers, "Solo debe incluir numeros"),
        nombres: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Campo requerido')
            .matches(string, "Solo se permiten letras"),
        apellidos: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last name required')
            .matches(string, "Solo se permiten letras"),
        email: Yup.string()
            .email('Formato no valido')
            .required('Campo requerido'),
        password: Yup.string()
            .strict(true)
            .required('Password is required')
            .trim('No se permiten espacios en blanco'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            .required("Confirma tu contraseña por favor!"),
    }
}


export function docenteInitialValues(){

    return {
        cedulaUsuario: '',
        nombres: '',
        apellidos: '',
        email: '',
        roles:[]        
    }
}

export function docenteValidationSchema(){
    return {
        cedulaUsuario: Yup.string().strict(true)
            .min(10, "Debe contener 10 caracteres")
            .required('Campo requerido')
            .matches(onlyNumbers, "Solo debe incluir numeros"),
        nombres: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Campo requerido')
            .matches(string, "Solo se permiten letras"),
        apellidos: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Campo requerido')
            .matches(string, "Solo se permiten letras"),
        email: Yup.string()
            .email('Formato no valido')
            .required('Campo requerido'),
        roles: Yup.array()
        .required("Seleccionar un rol")
        .min(1,"Seleccionar al menos 1 rol"),
    }
}



export function periodInitialValues() {
    return {
        anio: '',
        fechaInicio: null,
        fechaFin: null,
        descripcionPeriodo: ''
    }
}

export function periodValidationSchema(){
    return {
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
    }
}

export function changePasswordInitialValues(){
    return {
        password:'',
        confirmPassword:''
    }

}

export function changePasswordValidationSchema(){
    return {
        password: Yup.string()
            .strict(true)
            .required('Password is required')
            .trim('No se permiten espacios en blanco'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            .required("Confirma tu contraseña por favor!"),
    }
}