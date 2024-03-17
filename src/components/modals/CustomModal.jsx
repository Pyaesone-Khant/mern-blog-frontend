import {Modal} from "antd";

const CustomModal = ({children, isOpen, closeModal, ...props}) => {
    return <Modal open={isOpen} centered={true} width={400} footer={null} onCancel={closeModal} {...props}>
        {children}
    </Modal>
}

export default CustomModal;