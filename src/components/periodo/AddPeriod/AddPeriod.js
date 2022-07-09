import PropTypes from 'prop-types';
import CustomModal from "../CustomModal";
import FormularioPeriodo from "./FormularioPeriodo";

AddPeriod.propTypes = {
    reset: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default function AddPeriod(
    {
        reset,
        isOpen,
        onClose
    }) {
    return (
        <div>
            <CustomModal
                title="Agregar periodo académico"
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormularioPeriodo
                reset={reset}
                onClose={onClose}
                />
                
            </CustomModal>
        </div>

    )
}