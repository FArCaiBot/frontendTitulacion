import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { eliminarDocente, listarDocentes } from "../api/docenteAPI";
import Page from "../components/Page";
import Iconify from '../components/Iconify';
import DataDocente from "../components/docente/DataDocente";
import AddDocente from "../components/docente/AddDocente/AddDocente";
import { useAuth } from "../hooks";

export default function Docentes() {
    const [add, setAdd] = useState(false);
    const {auth}=useAuth();
    const [data, setData]=useState([]);

    useEffect(()=>{
        listar();
    },[]);

    const listar= async()=>{
        const result=await listarDocentes(auth?.token);
        setData(result);
    }

    const delDocente=async(id)=>{
        try{
            const result=await eliminarDocente(id, auth?.token);
            if(result.status===200){
                toast.success("Docente eliminado con éxito");
                listar();
            }else{
                toast.error("No se puede eliminar el docente.")
            }
        }catch(error){
            console.log(error)
        }
    }


    return (
        <Page title="Docentes">
            <Container>
                <Stack direction={"row"} alignItems="center" justifyContent={"space-between"} mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Docentes
                    </Typography>
                    <Button
                        onClick={() => setAdd(true)}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill"
                        />}>
                        Nuevo
                    </Button>
                </Stack>
                <AddDocente
                reset={listar}
                isOpen={add}
                onClose={()=>setAdd(false)}
                />
                <DataDocente
                data={data}
                reset={listar}
                delDocente={delDocente}
                />
            </Container>
        </Page>
    )
}