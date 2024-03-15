import { CustomBtn, FormLabel } from "@/components/index.js";
import { setAlertMessage } from "@/core/globalSlice.js";
import { useChangeUsernameMutation } from "@/features/users/UserApi.js";
import ModalHeader from "@/features/users/components/ModalHeader.jsx";
import { useCurrentUser } from "@/hooks/useCurrentUser.js";
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ChangeNameModal = ({ user, isUserAuth }) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { currentUser } = useCurrentUser();

    useEffect(() => {
        if (openModal) {
            form.setFieldsValue({ name: currentUser?.name });
        }
    }, [openModal]);

    const closeModal = () => {
        setOpenModal(false);
        form.setFieldsValue({ name: currentUser?.name });
    };

    const [changeUsername] = useChangeUsernameMutation();
    const onNameChange = async ({ name }) => {
        try {
            const updatedData = { name, id: user?._id };
            const { data } = await changeUsername(updatedData);
            if (data?.success) {
                dispatch(
                    setAlertMessage({ content: data.message, type: "success" })
                );
                closeModal();
            } else {
                dispatch(
                    setAlertMessage({ content: data.message, type: "error" })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="flex flex-col gap-2 font-medium p-5 rounded-md bg-cBlue/10 dark:bg-darkTer/10">
            <h3 className="md:min-w-[120px] text-lg"> Name : </h3>
            <div className={`flex justify-between items-center w-full`}>
                <p className="font-semibold text-xl"> {user?.name} </p>
                {isUserAuth && (
                    <CustomBtn
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => setOpenModal(true)}
                    >
                        Change
                    </CustomBtn>
                )}
            </div>
            <Modal
                centered
                width={420}
                open={openModal}
                footer={null}
                closeIcon={false}
                className={`auth-modal`}
            >
                <ModalHeader title={"change name"} event={closeModal} />
                <Form
                    form={form}
                    onFinish={onNameChange}
                    layout={"vertical"}
                    className={`p-6 bg-cBlue/10 `}
                >
                    <Form.Item
                        label={<FormLabel label={"name"} />}
                        name={"name"}
                        rules={[
                            {
                                required: true,
                                message: "Name is required!",
                            },
                            {
                                pattern: /\b([A-ZÀ-ÿ][-,a-zA-Z. ']+[ ]*)+/,
                                message:
                                    "First letter of the name must be a capital letter!",
                            },
                            {
                                min: 4,
                                message: "Name should not be too short!",
                            },
                        ]}
                    >
                        <Input placeholder={"Enter your name"} />
                    </Form.Item>
                    <CustomBtn
                        htmlType={"submit"}
                        className={`w-full`}
                        data="modal-button"
                    >
                        Confirm
                    </CustomBtn>
                </Form>
            </Modal>
        </section>
    );
};

export default ChangeNameModal;
