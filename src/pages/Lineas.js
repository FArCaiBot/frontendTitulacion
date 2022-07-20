import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { eliminarLinea, getLineas } from "../api/lineaAPI";

import Page from "../components/Page";
import Iconify from '../components/Iconify';
import { useAuth } from "../hooks";
import DataLinea from "../components/lineas/DataLineas";
import AddLinea from "../components/lineas/AddLinea/AddLinea";

export default function Lineas() {
    const [add, setAdd] = useState(false);
    const {auth}=useAuth();
    const [data, setData]=useState([]);

    useEffect(()=>{
        listar();
    },[]);

    const listar= async()=>{
        const result=await getLineas(auth?.token);
        setData(result);
    }

    const delLinea=async(id)=>{
        try{
            const result=await eliminarLinea(id, auth?.token);
            if(result.status===200){
                toast.success("Dato eliminado con éxito");
                listar();
            }else{
                toast.error("No se puede eliminar el dato.")
            }
        }catch(error){
            console.log(error)
        }
    }


    return (
        <Page title="Lineas">
            <Container>
                <Stack direction={"row"} alignItems="center" justifyContent={"space-between"} mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Lineas de Investigación
                    </Typography>
                    <Button
                        onClick={() => setAdd(true)}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill"
                        />}>
                        Nuevo
                    </Button>
                </Stack>
                <AddLinea
                reset={listar}
                isOpen={add}
                onClose={()=>setAdd(false)}
                />
                <DataLinea
                data={data}
                reset={listar}
                delLinea={delLinea}
                />
            </Container>
        </Page>
    )
}