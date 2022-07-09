import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import PropTypes from 'prop-types'
import { useState } from "react";
import Iconify from "../../Iconify";
import CustomModal from "../CustomModal";
import EditPeriodForm from "./EditPeriodForm";


EditarPeriodo.propTypes={
    period: PropTypes.object,
    reset: PropTypes.func
}

export default function EditarPeriodo({period, reset}) {

    const [open, setOpen] = useState(false);

    return (
        <>
            < MenuItem sx={{ color: 'text.secondary' }} onClick={()=>setOpen(true)}>
                <ListItemIcon>
                    <Iconify icon="eva:edit-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
            </ MenuItem>
            <CustomModal
                title="Editar Periodo Académico"
                isOpen={open}
                onClose={()=>setOpen(false)}
            > 
            <EditPeriodForm
            data={period}
            onClose={()=>setOpen(false)}
            reset={()=>reset()}

            />
            </CustomModal>
        </>
    )

}