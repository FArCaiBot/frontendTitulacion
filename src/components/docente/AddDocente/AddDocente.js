import PropTypes from 'prop-types';
import CustomModal from '../../periodo/CustomModal'
import AddDocenteForm from './AddDocenteForm';

AddDocente.propTypes = {
    reset: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default function AddDocente(
    {
        reset, 
        isOpen, 
        onClose
    }
){
    return (
        <div>
            <CustomModal
            title='Agregar docente'
            isOpen={isOpen}
            onClose={onClose}            
            >
                <AddDocenteForm
                reset={reset}
                onClose={onClose}                
                />
            </CustomModal>
        </div>
    )
}