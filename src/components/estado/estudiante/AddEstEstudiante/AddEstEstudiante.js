import PropTypes from 'prop-types';
import CustomModal from "../../../periodo/CustomModal";
import AddEstEstudianteForm from './AddEstEstudianteForm';



AddEstEstudiante.propTypes = {
    reset: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default function AddEstEstudiante(
    {
        reset,
        isOpen,
        onClose
    }) {
    return (
        <div>
            <CustomModal
                title="Agregar estado de estudiante"
                isOpen={isOpen}
                onClose={onClose}
            >
                <AddEstEstudianteForm
                    onClose={onClose}
                    reset={reset}
                />
            </CustomModal>
        </div>

    )
}