import {Form, Input, Modal} from "antd";
import {useState} from "react";
import {FormLabel, SubmitBtn} from "@/components/index.js";
import ModalHeader from "@/features/users/components/ModalHeader.jsx";
import {useChangeUserPasswordMutation} from "@/features/users/UserApi.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {logoutAccount, setLoginState} from "@/features/auth/authSlice.js";
import {useNavigate} from "react-router-dom";

const ChangeNameModal = ({isUserAuth}) => {
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const nav = useNavigate();

    const closeModal = () => {
        setOpenModal(false);
        form.resetFields();
        setIsSubmitting(false)
    }

    const [changeUserPassword] = useChangeUserPasswordMutation();
    const onNameChange = async (values) => {
        try {
            delete values?.password_confirmation;
            setIsSubmitting(true);
            const {data} = await changeUserPassword(values);
            if(data?.success){
                dispatch(setAlertMessage({type : "success", content : data?.message}))
                dispatch(
                    setLoginState({
                        isLoggedIn: false,
                        token: null,
                    })
                );
                dispatch(logoutAccount());
                closeModal();
                nav("/login");
            }else{
                dispatch(setAlertMessage({type : "error", content : data?.message}));
            }

        }catch (error){
            throw new Error(error)
        }finally {
            setIsSubmitting(false)
        }
    };

    return (
        <section className={` ${!isUserAuth ? "hidden" : ""} flex flex-row items-center justify-between font-medium p-5 rounded-md bg-white dark:bg-slate-700`}>
            <h3 className="md:min-w-[120px] text-lg"> Password : </h3>
            <button onClick={() => setOpenModal(true)} className={`modal-trigger`}  >Change</button>
            <Modal centered width={420} open={openModal} footer={null} closeIcon={false} className={`auth-modal`} >
                <ModalHeader title={"change password"} event={closeModal} />
                <Form form={form} onFinish={onNameChange} layout={"vertical"} className={`p-6`} >
                    <Form.Item label={<FormLabel label={"current password"} />} hasFeedback={true}  name={"password"} rules={[
                        {required : true, message : "Current password is required!"}
                    ]} >
                        <Input.Password placeholder={"Enter your current password"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"password"} />}  hasFeedback={true}  name={"newPassword"} rules={[ {required : true, message : "Password is required!"},
                        {pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must have minimum eight characters, at least one uppercase letter, one number and one special character."}
                    ]} >
                        <Input.Password placeholder={"Enter your new password"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"confirm password"} />} hasFeedback={true}  name={"password_confirmation"} dependencies={["newPassword"]} rules={[{required : true, message : "Password confirmation is required!"},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The password confirmation does not match!'));
                            },
                        })
                    ]}>
                        <Input.Password placeholder={"Confirm your new password"} />
                    </Form.Item>
                    <div className={'py-3'}></div>
                    <SubmitBtn label={"Confirm"} isSubmitting={isSubmitting} />
                </Form>
            </Modal>
        </section>
    );
};

export default ChangeNameModal;
