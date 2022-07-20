import { useState, useEffect } from 'react';

// material
import {
  Stack,
  Container,
  Typography,
  Button
} from '@mui/material';
// components

import { toast } from 'react-hot-toast';
import AddPeriod from '../components/periodo/AddPeriod/AddPeriod';
import { eliminarPeriodo, getPeriodosAPI } from '../api/periodoAcademicoAPI';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import DataPeriodo from '../components/periodo/DataPeriodo';
import { useAuth } from '../hooks';
import Loader from '../components/Loader/Loader';
// mock

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


export default function Periodo() {

  const {auth}=useAuth();

  /* --------------------------------------- */
  const [data, setData] = useState([]);

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    const result = await getPeriodosAPI(auth?.token);
    setData(result);
  }

  const delPeriodo = async (id) => {
    try {
      const result = await eliminarPeriodo(id, auth?.token);

      if (result.status===200) {
        toast.success(`Periodo ${id} eliminado`);
        search();
      }
    } catch (error) {
      toast.error("No se pudo eliminar el periodo");
    }
  }
  /* ---------------------------------------- */

  const [add, setAdd] = useState(false);

  if(!auth) return <Loader/>

  return (
    <Page title="Periodos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Periodo Académico
          </Typography>
          <Button
            onClick={() => setAdd(true)}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill"
            />}>
            Nuevo
          </Button>
        </Stack>
        <AddPeriod
            reset={search}
            isOpen={add}
            onClose={() => setAdd(false)}
          />
          <DataPeriodo
          data={data}
          delPeriodo={delPeriodo}
          reset={search}
          />
      </Container>
    </Page>
  );
}
