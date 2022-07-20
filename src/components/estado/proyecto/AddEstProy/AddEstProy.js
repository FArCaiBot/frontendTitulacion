import PropTypes from 'prop-types';
import CustomModal from "../../../periodo/CustomModal";
import AddEstProyForm from './AddEstProyForm';


AddEstProy.propTypes = {
    reset: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default function AddEstProy(
    {
        reset,
        isOpen,
        onClose
    }) {
    return (
        <div>
            <CustomModal
                title="Agregar estado de proyecto"
                isOpen={isOpen}
                onClose={onClose}
            >
                <AddEstProyForm
                    onClose={onClose}
                    reset={reset}
                />

            </CustomModal>
        </div>

    )
}