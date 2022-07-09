import { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import PropTypes from 'prop-types';
import Iconify from '../../../components/Iconify';
import ResponsiveDialog from '../../../components/Alert';

// ----------------------------------------------------------------------
UserMoreMenu.propTypes={
  title: PropTypes.string,
  body: PropTypes.string,
  onDelAction: PropTypes.func,
  children:PropTypes.node,
}

export default function UserMoreMenu({
  title,
  body, 
  onDelAction,
  children
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [delOpen, setDelOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => setDelOpen(true)}>
          <ListItemIcon >
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <ResponsiveDialog
          isOpen={delOpen}
          title={title}
          onClose={()=>setDelOpen(false)}
          body={body}
          onClickAction={()=>{onDelAction(); setDelOpen(false)}}
        />
        {children}
      </Menu>
    </>
  );
}
