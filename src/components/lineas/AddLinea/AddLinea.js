import PropTypes from 'prop-types';
import CustomModal from "../../periodo/CustomModal";
import AddLineaForm from './AddLineaForm';



AddLinea.propTypes = {
    reset: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default function AddLinea(
    {
        reset,
        isOpen,
        onClose
    }) {
    return (
        <div>
            <CustomModal
                title="Agregar línea de investigación"
                isOpen={isOpen}
                onClose={onClose}
            >
                <AddLineaForm
                    onClose={onClose}
                    reset={reset}
                />
                
            </CustomModal>
        </div>

    )
}