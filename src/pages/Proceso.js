import { Stack, Typography, Container, Button } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { listarProcesos } from "../api/procesoAPI";
import DataProceso from "../components/proceso/DataProceso";
import Iconify from "../components/Iconify";
import Page from "../components/Page";
import { useAuth } from '../hooks';

export default function Proceso() {

    const {auth}=useAuth();

    const [data,setData]=useState([]);

    useEffect(()=>{
        listar();
    },[])

    const listar=async ()=>{
        const result=await listarProcesos(auth?.token);
        setData(result);
    }

    return (
        <div>
            <Page title="Procesos">
                <Container>
                    <Stack direction={"row"} alignItems="center" justifyContent={"space-between"} mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Catálogo de procesos y actividades
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill"
                            />}>
                            Nuevo
                        </Button>
                    </Stack>
                    <DataProceso
                    data={data}
                    />
                </Container>
            </Page>
        </div>
    );
}