import {useState} from "react";
import {Button, Modal} from "antd";
import {CancelBtn} from "@/components/index.js";
import {setAlertMessage} from "@/core/globalSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MdWarning} from "react-icons/md";

const ConfirmationModal = ({returnPath, event, isComment}) => {
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch();
    const nav = useNavigate();

    const closeModal = () => {
        setOpenModal(false);
        setIsSubmitting(false)
    }

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            const { data } = await event();
            if (data?.success) {
                setIsSubmitting(false);
                nav(returnPath);
                dispatch(setAlertMessage({type : "success", content : data?.message}))
                closeModal();
            } else {
                setIsSubmitting(false);
                dispatch(setAlertMessage({type : "error", content : data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={`min-w-max`}>
            <button onClick={() => setOpenModal(true)} >
                Delete
            </button>
            <Modal centered={true} width={""} open={openModal} footer={null} closeIcon={false} >
                <div className={`flex flex-col gap-2 items-center justify-center`}>
                    <MdWarning className={`text-4xl text-red-600 `}/>
                    <h3 className={`text-xl font-medium min-w-max`} >Are you sure you want to delete this {isComment ? "comment" : "blog"} ?</h3>
                    <p className={`text-base font-medium`}>You won&apos;t be able to revert this!</p>
                </div>
                <div className={`mt-10 flex items-center gap-5`}>
                    <CancelBtn event={closeModal}/>
                    <Button type={"primary"} htmlType={"button"} loading={isSubmitting} onClick={handleDelete} className={`btn delete-btn`}>Delete</Button>
                </div>
            </Modal>
        </section>
    );
};

export default ConfirmationModal;
