import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Iconify from '../../Iconify';
import { useAuth } from '../../../hooks';
import { eliminarEstEstudiante, getEstEstudiante } from "../../../api/estadosAPI";
import DataEstEstudiante from "./DataEstEstudiante";
import AddEstEstudiante from "./AddEstEstudiante/AddEstEstudiante";
/* import AddEstProy from "./AddEstProy/AddEstProy"; */

export default function EstEstudiante() {

    const { auth } = useAuth();

    const [add, setAdd] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        search();
    }, []);

    const search = async () => {
        const result = await getEstEstudiante(auth?.token);
        setData(result);
    }

    const delEstado = async (id) => {
        try {
            const result = await eliminarEstEstudiante(id, auth?.token);

            if (result.status === 200) {
                toast.success(`Periodo ${id} eliminado`);
                search();
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Button
                    onClick={() => setAdd(true)}
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill"
                    />}>
                    Nuevo
                </Button>
                <AddEstEstudiante
                    reset={search}
                    isOpen={add}
                    onClose={() => setAdd(false)}
                />
            </Stack>
            <DataEstEstudiante
                data={data}
                reset={search}
                delEstado={delEstado}
            />
        </Container>
    )
}