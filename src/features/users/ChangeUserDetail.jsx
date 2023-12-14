import {useState} from "react";
import { FormLabel, SubmitBtn} from "@/components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logoutAccount, setLoginState} from "../auth/authSlice";
import {setAlertMessage} from "@/core/globalSlice.js";
import {Form, Input} from "antd";

const ChangeUserDetail = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();

    // const onSubmit = async (values) => {
    //     delete values?.password_confirmation;
    {/*    const updatedUser = values.newPassword*/}
    {/*        ? { ...values, id: user?._id }*/}
    {/*        : { name: values?.name, password: values?.password, id: user?._id };*/}
    {/*    setIsSubmitting(true);*/}
    {/*    try {*/}
    {/*        const { data } = await updateUser(updatedUser);*/}
    {/*        if (data?.success) {*/}
    {/*            setIsSubmitting(false);*/}
    {/*            dispatch(*/}
    {/*                setLoginState({*/}
    {/*                    isLoggedIn: false,*/}
    //                     user: null,
    //                     token: null,
    {/*                })*/}
    {/*            );*/}
    //             dispatch(logoutAccount())
    //             nav("/login");
    //             dispatch(setAlertMessage({type : "success", content : data?.message}))
    //         } else {
    //             setIsSubmitting(false);
    //             dispatch(setAlertMessage({type : "error", content : data?.message}))
    //         }
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // };

    return (
        <section className="  flex items-center justify-center  w-full">
            <div className="common-card">
                <h2 className="form-tlt text-center mb-8"> Change User Info </h2>

                <Form layout={"vertical"} >
                    <Form.Item label={<FormLabel label={"Name"} />}  hasFeedback={true}  name={"name"} rules={[
                        {required : true, message : "Name is required!"}
                    ]} initialValue={user?.name}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"current password"} />} hasFeedback={true}  name={"password"} rules={[
                        {required : true, message : "Current password is required!"}
                    ]} >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"password"} isOptional={true} />}  hasFeedback={true}  name={"newPassword"} rules={[
                        {pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                        "Password must have minimum eight characters, at least one uppercase letter, one number and one special character."}
                    ]} >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"confirm password"} isOptional={true} />} hasFeedback={true}  name={"password_confirmation"} dependencies={["newPassword"]} rules={[
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The password confirmation does not match!'));
                            },
                        })
                    ]}>
                        <Input.Password/>
                    </Form.Item>
                    <div className={'py-3'}></div>
                    <SubmitBtn label={"Confirm"} isSubmitting={isSubmitting} />
                </Form>
            </div>
        </section>
    );
};

export default ChangeUserDetail;
