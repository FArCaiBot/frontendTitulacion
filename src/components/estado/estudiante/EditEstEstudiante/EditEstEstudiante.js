import { useState } from "react";
import PropTypes from 'prop-types'
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import Iconify from "../../../Iconify";
import CustomModal from "../../../periodo/CustomModal";
import EditEstEstudianteForm from "./EditEstEstudianteForm";


EditarEstEstudiante.propTypes = {
    estado: PropTypes.object,
    reset: PropTypes.func
}

export default function EditarEstEstudiante({ estado, reset }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <MenuItem sx={{ color: 'text.secondary' }} onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <Iconify icon="eva:edit-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
            </ MenuItem>
            <CustomModal
                title="Editar estado estudiante"
                isOpen={open}
                onClose={()=>setOpen(false)}
            > 
            <EditEstEstudianteForm
            data={estado}
            onClose={()=>setOpen(false)}
            reset={()=>reset()}
            />
            </CustomModal>
        </>
    )
}