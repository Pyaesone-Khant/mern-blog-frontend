import {useState} from "react";
import {CustomBtn, CustomModal} from "@/components/index.js";
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
            const {data} = await event();
            if (data?.success) {
                setIsSubmitting(false);
                nav(returnPath);
                dispatch(setAlertMessage({type: "success", content: data?.message}))
                closeModal();
            } else {
                setIsSubmitting(false);
                dispatch(setAlertMessage({type: "error", content: data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={`min-w-max`}>
            <button onClick={() => setOpenModal(true)} className={`py-1`}>
                Delete
            </button>
            <CustomModal open={openModal} closeModal={closeModal} width={440}>
                <div className={`flex flex-col items-center justify-center gap-1`}>
                    <MdWarning className={`text-4xl text-red-600 `}/>
                    <h3 className={`text-lg font-medium min-w-max`}>Are you sure you want to delete
                        this {isComment ? "comment" : "blog"} ?</h3>
                    <p className={`text-sm font-medium`}>You won&apos;t be able to revert this!</p>
                </div>
                <div className={`flex items-center justify-center gap-2 mt-4`}>
                    <CustomBtn variant={"outline"} size={"xs"} onClick={closeModal}>Cancel</CustomBtn>
                    <CustomBtn variant={"danger"} size={"xs"} onClick={handleDelete}
                               loading={isSubmitting}>Delete</CustomBtn>
                </div>
            </CustomModal>
        </section>
    );
};

export default ConfirmationModal;
