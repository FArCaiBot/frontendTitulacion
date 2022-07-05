import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Iconify from '../Iconify';
import FormularioPeriodo from './FormularioPeriodo';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  /* width: 400, */
  minWidth:320,
  bgcolor: 'background.paper',
  /* border: '1px solid #000', */
  borderRadius: 2,
  boxShadow: 2,
  p: 4,
};

export default function BasicModal({reset}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Nuevo</Button> */}
      <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
        Nuevo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar periodo académico
          </Typography>
       {/*    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <FormularioPeriodo reset={reset} onClose={handleClose}/>
          <Button sx={{mt:2}} onClick={handleClose} color="error" fullWidth size='large' variant='outlined'>Cancelar</Button>
        </Box>
      </Modal>
    </div>
  );
}
