import React, {useState} from 'react';
// icons
import {MdOutlineAdd} from "react-icons/md";

// components
import {CustomBtn, CustomModal} from "@/components/index.js";
import {Form, Input} from "antd";

// apis
import {useCreateCategoryMutation} from "@/features/categories/categoriesApi.js";

// reducers
import {setAlertMessage} from "@/core/globalSlice.js";

// redux
import {useDispatch} from "react-redux";

const AddNewCategory = () => {

    const [openModal, setOpenModal] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const [createCategory, {isLoading}] = useCreateCategoryMutation()

    const onFinish = async (values) => {
        const {data, error} = await createCategory(values)
        if (data?.success) {
            dispatch(setAlertMessage({content: data?.message, type: "success"}))
            toggleModal();
        } else {
            dispatch(setAlertMessage({content: error?.data?.message, type: "error"}))
        }
    }

    const toggleModal = () => {
        setOpenModal(!openModal)
        form.resetFields()
    }

    return (
        <section>
            <CustomBtn size={"sm"} onClick={toggleModal}>
                <MdOutlineAdd className={`text-xl mr-1`}/> New Category
            </CustomBtn>
            <CustomModal closeModal={toggleModal} isOpen={openModal} title={"Add New Category"}>
                <Form form={form} onFinish={onFinish} className={"pt-2"}>
                    <Form.Item name={"title"} rules={[
                        {
                            required: true, message: "Category name is required"
                        }
                    ]}>
                        <Input placeholder={"Category Title"}/>
                    </Form.Item>
                    <div className={`flex items-center justify-end gap-2`}>
                        <CustomBtn size={"sm"} variant={"outline"} onClick={toggleModal}
                                   disabled={isLoading}>Cancel</CustomBtn>
                        <CustomBtn size={"sm"} htmlType={"submit"} loading={isLoading}>Save</CustomBtn>
                    </div>
                </Form>
            </CustomModal>
        </section>
    );
};

export default AddNewCategory;
