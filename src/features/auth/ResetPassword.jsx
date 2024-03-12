import {Form, Input} from "antd";
import {CustomBtn, FormLabel} from "@/components/index.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useResetPasswordMutation} from "@/features/auth/authApi.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";

const ResetPassword = () => {

    const location = useLocation();
    const email = location?.state?.email;

    const dispatch = useDispatch();
    const nav = useNavigate();

    const [resetPassword, {isLoading}] = useResetPasswordMutation()
    const onSubmit = async (values) => {
        try {
            const updatedData = {password: values?.password, email};
            const {data} = await resetPassword(updatedData);
            if (data?.success) {
                dispatch(setAlertMessage({type: "success", content: data?.message}))
                nav("/login", {replace: true})
            } else {
                dispatch(setAlertMessage({type: "error", content: data?.message}))
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <section className="flex items-center justify-center w-full">
            <div className="common-card">
                <h2 className="form-tlt mb-8"> Reset Password </h2>

                <Form layout={"vertical"} onFinish={onSubmit}>
                    <Form.Item label={<FormLabel label={"password"}/>} hasFeedback={true} name={"password"} rules={[{
                        required: true, message: "Password is required!"
                    },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must have minimum eight characters, at least one uppercase letter, one number and one special character."
                        }
                    ]}>
                        <Input.Password placeholder={"Enter password"}/>
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"confirm password"}/>} hasFeedback={true}
                               name={"password_confirmation"} dependencies={["password"]} rules={[
                        {required: true, message: "Password confirmation is required!"},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The password confirmation does not match!'));
                            },
                        })
                    ]}>
                        <Input.Password placeholder={"Confirm your password"}/>
                    </Form.Item>
                    <CustomBtn htmlType={"submit"} className={`w-full`} loading={isLoading}>
                        Confirm
                    </CustomBtn>
                </Form>
            </div>
        </section>
    );
};

export default ResetPassword;
