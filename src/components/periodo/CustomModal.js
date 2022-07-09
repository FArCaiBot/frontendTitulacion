import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DialogActions } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 320,
    bgcolor: 'background.paper',
    /* border: '2px solid #000', */
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

CustomModal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
}

export default function CustomModal(
    {
        title,
        isOpen,
        onClose,
        children
    }) {

    const handleClose = onClose;

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant='h6' component={'h2'}>
                        {title}
                    </Typography>
                    {children}

                    <DialogActions>
                        <Button sx={{ mt: 2 }} onClick={handleClose} color="error" fullWidth size='large' variant='outlined'>
                            Cancelar
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </div>
    );
}