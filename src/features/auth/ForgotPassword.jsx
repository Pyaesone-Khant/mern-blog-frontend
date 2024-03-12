import {Form, Input} from "antd";
import {BackBtn, CustomBtn} from "@/components/index.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useForgotPasswordMutation} from "@/features/auth/authApi.js";
import {setAlertMessage} from "@/core/globalSlice.js";
import {useDispatch} from "react-redux";
import AuthComponentWrapper from "@/features/auth/AuthComponentWrapper.jsx";

const ForgotPassword = () => {

    const location = useLocation()
    const currentRoute = location?.pathname;

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [forgotPassword, {isLoading}] = useForgotPasswordMutation()
    const onSubmit = async (values) => {
        try {
            const {data} = await forgotPassword(values);
            if (data?.success) {
                nav("/verifyOtp", {state: {email: values?.email, prevRoute: currentRoute}});
                dispatch(setAlertMessage({type: "success", content: data?.message}))
            } else {
                dispatch(setAlertMessage({type: "error", content: data?.message}));
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <AuthComponentWrapper>
            <Form layout={"vertical"} onFinish={onSubmit} className={`max-w-md w-full px-4`}>
                <div className="text-center mb-8">
                    <h2 className="form-tlt"> Forgot Password ? </h2>
                    <p className={` text-gray-500 dark:text-gray-300`}> Please the email address that associated <br/>to
                        your
                        account!</p>
                </div>
                <Form.Item name={"email"} rules={[
                    {required: true, message: "Email address is required!"}, {
                        type: "email",
                        message: "Enter valid email address!"
                    }
                ]}>
                    <Input type={"email"} placeholder={"Email"}/>
                </Form.Item>
                <CustomBtn htmlType={"submit"} className={`w-full`} loading={isLoading}>
                    Confirm
                </CustomBtn>
                <div className={`mt-10 flex justify-center`}>
                    <BackBtn/>
                </div>
            </Form>
        </AuthComponentWrapper>
    );
};

export default ForgotPassword;
