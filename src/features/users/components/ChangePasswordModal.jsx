import {useState} from "react";

// components
import ModalHeader from "@/features/users/components/ModalHeader.jsx";
import {CustomBtn, FormLabel} from "@/components/index.js";
import {Form, Input, Modal} from "antd";

// apis
import {useChangeUserPasswordMutation} from "@/features/users/UserApi.js";

// reducers
import {setAlertMessage} from "@/core/globalSlice.js";
import {logoutAccount} from "@/features/auth/authSlice.js";

// redux
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const ChangeNameModal = ({isUserAuth}) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const nav = useNavigate();

    const closeModal = () => {
        setOpenModal(false);
        form.resetFields();
    };

    const [changeUserPassword, {isLoading}] = useChangeUserPasswordMutation();
    const onNameChange = async (values) => {
        try {
            delete values?.password_confirmation;
            const {data, error} = await changeUserPassword(values);
            if (data) {
                dispatch(
                    setAlertMessage({type: "success", content: data?.message})
                );
                dispatch(logoutAccount());
                closeModal();
                nav("/login");
            } else {
                dispatch(
                    setAlertMessage({type: "error", content: error?.data?.message})
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section
            className={` ${
                !isUserAuth ? "hidden" : ""
            } flex flex-row items-center justify-between font-medium p-5 rounded-md bg-cBlue/10 dark:bg-darkTer/10`}
        >
            <h3 className="md:min-w-[120px] text-lg"> Password : </h3>
            <CustomBtn
                variant={"outline"}
                size={"sm"}
                onClick={() => setOpenModal(true)}
            >
                Change
            </CustomBtn>
            <Modal
                centered
                width={420}
                open={openModal}
                footer={null}
                closeIcon={false}
                className={`auth-modal`}
            >
                <ModalHeader title={"change password"} event={closeModal}/>
                <Form
                    form={form}
                    onFinish={onNameChange}
                    layout={"vertical"}
                    className={`p-6 bg-cBlue/10`}
                >
                    <Form.Item
                        label={<FormLabel label={"current password"}/>}
                        hasFeedback={true}
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Current password is required!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder={"Enter your current password"}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<FormLabel label={"password"}/>}
                        hasFeedback={true}
                        name={"newPassword"}
                        rules={[
                            {
                                required: true,
                                message: "Password is required!",
                            },
                            {
                                pattern:
                                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder={"Enter your new password"}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<FormLabel label={"confirm password"}/>}
                        hasFeedback={true}
                        name={"password_confirmation"}
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: "Password confirmation is required!",
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The password confirmation does not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder={"Confirm your new password"}
                        />
                    </Form.Item>
                    <CustomBtn
                        htmlType={"submit"}
                        className={"mt-9 w-full"}
                        data="modal-button"
                        loading={isLoading}
                    >
                        Confirm
                    </CustomBtn>
                </Form>
            </Modal>
        </section>
    );
};

export default ChangeNameModal;
