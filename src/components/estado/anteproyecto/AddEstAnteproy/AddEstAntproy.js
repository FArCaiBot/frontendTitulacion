import PropTypes from 'prop-types';
import CustomModal from "../../../periodo/CustomModal";
import AddEstAntForm from './AddEstAntForm';

AddEstAntproy.propTypes = {
    reset: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default function AddEstAntproy(
    {
        reset,
        isOpen,
        onClose
    }) {
    return (
        <div>
            <CustomModal
                title="Agregar estado de anteproyecto"
                isOpen={isOpen}
                onClose={onClose}
            >
                <AddEstAntForm
                onClose={onClose}
                reset={reset}
                />         
            </CustomModal>
        </div>

    )
}