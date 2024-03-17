import React, {useEffect, useState} from 'react';

// icons
import {AiOutlineEdit} from "react-icons/ai";

// components
import {CustomBtn, CustomModal} from "@/components/index.js";
import {Form, Input} from "antd";

// apis
import {useUpdateCategoryMutation} from "@/features/categories/categoriesApi.js";

// reducers
import {setAlertMessage} from "@/core/globalSlice.js";

// redux
import {useDispatch} from "react-redux";

const EditCategory = ({category}) => {

    const [openModal, setOpenModal] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        form.setFieldsValue(category)
    }, [category])

    const [updateCategory, {isLoading}] = useUpdateCategoryMutation()

    const onFinish = async ({title}) => {
        const updatedData = {
            id: category?._id,
            title
        }
        const {data, error} = await updateCategory(updatedData);
        if (data?.success) {
            toggleModal();
            dispatch(setAlertMessage({content: data?.message, type: "success"}))
        } else {
            dispatch(setAlertMessage({content: error?.data?.message, type: "error"}))
        }
    }
    const toggleModal = () => {
        setOpenModal(!openModal)
        form.setFieldsValue(category)
    }

    return <section className={`w-fit mx-auto`}>
        <CustomBtn variant={"ghost"} size={"xs"} onClick={toggleModal} className={`px-2`}>
            <AiOutlineEdit className={`!text-xl`}/>
        </CustomBtn>
        <CustomModal isOpen={openModal} closeModal={toggleModal} title={"Edit Category"}>
            <Form form={form} onFinish={onFinish} className={"pt-2"}>
                <Form.Item name={"title"} rules={[
                    {
                        required: true,
                        message: "Title is required"
                    }
                ]}>
                    <Input placeholder={"Category Title"}/>
                </Form.Item>
                <div className={`flex items-stretch gap-2 justify-end`}>
                    <CustomBtn variant={"outline"} size={"sm"} onClick={toggleModal}
                               disabled={isLoading}>Cancel</CustomBtn>
                    <CustomBtn
                        size={"sm"} htmlType={"submit"} loading={isLoading}>Save</CustomBtn>
                </div>
            </Form>
        </CustomModal>
    </section>
};

export default EditCategory;
