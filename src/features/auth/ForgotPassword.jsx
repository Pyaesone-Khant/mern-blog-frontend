import {Form, Input} from "antd";
import { FormLabel, SubmitBtn} from "@/components/index.js";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useForgotPasswordMutation} from "@/features/auth/authApi.js";
import {setAlertMessage} from "@/core/globalSlice.js";
import {useDispatch} from "react-redux";

const ForgotPassword = () => {

    const location = useLocation()
    const currentRoute = location?.pathname;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [forgotPassword] = useForgotPasswordMutation()
    const onSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const {data}  = await forgotPassword(values);
           if(data?.success){
               nav("/verifyOtp", {state : {email : values?.email, prevRoute : currentRoute}});
               dispatch(setAlertMessage({type : "success", content : data?.message}))
           }else{
                dispatch(setAlertMessage({type : "error", content : data?.message}));
           }
        }catch(error){
            throw new Error(error)
        }finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="flex items-center justify-center w-full">
            <div className="common-card">
                <div className="text-center mb-8">
                    <h2 className="form-tlt"> Forgot Password </h2>
                    <p className={` text-gray-500 dark:text-gray-300`}> Please verify your email address!</p>
                </div>

                <Form layout={"vertical"} onFinish={onSubmit}>
                    <Form.Item label={<FormLabel label={"email"}/>} name={"email"} rules={[
                        {required : true, message : "Email address is required!"}, {
                            type : "email",
                            message : "Enter valid email address!"
                        }
                    ]}>
                        <Input type={"email"} placeholder={"example@gmail.com"}  />
                    </Form.Item>
                    <div className={`py-3`}></div>
                       <SubmitBtn isSubmitting={isSubmitting}
                           label={"Confirm"}
                       />
                </Form>
            </div>
        </section>
    );
};

export default ForgotPassword;
