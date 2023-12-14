import {Form, Input, Modal} from "antd";
import {useEffect, useState} from "react";
import {FormLabel, SubmitBtn} from "@/components/index.js";
import ModalHeader from "@/features/users/components/ModalHeader.jsx";
import {useDispatch} from "react-redux";
import {useChangeUsernameMutation, useGetUserDataQuery} from "@/features/users/UserApi.js";
import {setAlertMessage} from "@/core/globalSlice.js";

const ChangeNameModal = ({user, isUserAuth}) => {
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {data : currentUser} = useGetUserDataQuery()

    useEffect(() => {
        if(openModal){
            form.setFieldsValue({name : currentUser?.data?.name})
        }
    }, [openModal]);


    const closeModal = () => {
        setOpenModal(false);
        form.setFieldsValue({name :  currentUser?.data?.name});
        setIsSubmitting(false)
    }

    const [changeUsername] = useChangeUsernameMutation();
    const onNameChange = async ({name}) => {
        try {
            setIsSubmitting(true)
            const updatedData = {name, id : user?._id}
            const {data} = await changeUsername(updatedData);
            if(data?.success){
                dispatch(setAlertMessage({content : data.message, type : "success"}));
                closeModal();
            }else{
                dispatch(setAlertMessage({content : data.message, type : "error"}));
            }
        }catch (error){
            throw new Error(error)
        }finally {
            setIsSubmitting(false)
        }
    };

    return (
        <section className="flex flex-col md:flex-row md:items-center gap-5 font-medium p-5 rounded-md bg-white dark:bg-slate-700">
                <h3 className="md:min-w-[120px] text-lg"> Name : </h3>
                <div className={`flex justify-between items-center w-full`}>
                    <p className="font-semibold text-xl"> {user?.name} </p>
                    <button onClick={() => setOpenModal(true)} className={`modal-trigger ${!isUserAuth ? "hidden" : ""}`}  >Change</button>
                </div>
            <Modal centered width={420} open={openModal} footer={null} closeIcon={false} className={`auth-modal`} >
                <ModalHeader title={"change name"} event={closeModal} />
                <Form form={form} onFinish={onNameChange} layout={"vertical"} className={`p-6`} >
                    <Form.Item label={<FormLabel label={"name"}/>} name={"name"} rules={[
                        {
                            required : true, message : "Name is required!"
                        },{
                            pattern: /\b([A-ZÀ-ÿ][-,a-zA-Z. ']+[ ]*)+/,
                            message:
                                "First letter of the name must be a capital letter!",
                        },{
                            min: 5,
                            message: "Name should not be too short!",
                        },
                    ]}>
                        <Input placeholder={"Enter your name"} />
                    </Form.Item>
                    <div className={`py-3`}></div>
                    <SubmitBtn label={"Confirm"} isSubmitting={isSubmitting} />
                </Form>
            </Modal>
        </section>
    );
};

export default ChangeNameModal;
