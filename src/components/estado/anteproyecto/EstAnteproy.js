import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Iconify from '../../Iconify';
import DataEstAnt from "./DataEstAnt";
import { useAuth } from '../../../hooks';
import { eliminarEstAnt, getEstAnteproy } from "../../../api/estadosAPI";
import AddEstAntproy from "./AddEstAnteproy/AddEstAntproy";

export default function EstAnteproy() {

    const { auth } = useAuth();

    const [add, setAdd] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        search();
    }, []);

    const search = async () => {
        const result = await getEstAnteproy(auth?.token);
        setData(result);
    }

    const delEstado = async (id) => {
        try {
            const result = await eliminarEstAnt(id, auth?.token);

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
                <AddEstAntproy
                    reset={search}
                    isOpen={add}
                    onClose={() => setAdd(false)}
                />
            </Stack>
            <DataEstAnt
                data={data}
                reset={search}
                delEstado={delEstado}
            />
        </Container>
    )
}