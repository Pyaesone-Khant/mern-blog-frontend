import { useEffect, useState } from "react";

// icons
import { MdOutlineArrowBack } from "react-icons/md";

// components
import { CustomBtn } from "@/components/index.js";
import AuthComponentWrapper from "@/features/auth/AuthComponentWrapper.jsx";
import { Form } from "antd";
import OTPInput from "react-otp-input";

// apis
import {
    useResendOTPMutation,
    useVerifyOTPMutation,
} from "@/features/auth/authApi.js";

// reducers
import { setAlertMessage } from "@/core/globalSlice.js";
import { logoutAccount } from "@/features/auth/authSlice.js";

// third-party
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
    const location = useLocation();
    const email = location?.state?.email;
    const prevRoute = location?.state?.prevRoute;
    const newEmail = location?.state.newEmail;

    const [form] = Form.useForm();
    const [otp, setOtp] = useState("");
    const [isResent, setIsResent] = useState(false);
    const [timer, setTimer] = useState(60);

    const nav = useNavigate();
    const dispatch = useDispatch();

    // resend otp btn countdown
    useEffect(() => {
        let counter;
        if (isResent) {
            counter = setInterval(decreaseTimer, 1000);
        } else {
            clearInterval(counter);
        }
        return () => clearInterval(counter);
    }, [timer, isResent]);

    const decreaseTimer = () => {
        if (timer > 0) {
            setTimer(timer - 1);
        } else {
            setIsResent(false);
        }
    };

    const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
    const onOtpVerify = async (value) => {
        try {
            const { otpCode } = value;
            const { data, error } = await verifyOTP({
                otp: otpCode,
                email,
                newEmail,
            });
            if (data) {
                if (prevRoute === "/forgotPassword") {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            content: "OTP verified successfully!",
                        })
                    );
                    nav("/resetPassword", { state: { email }, replace: true });
                } else {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            content: data?.message,
                        })
                    );
                    dispatch(logoutAccount());
                    nav("/login", { replace: true });
                }
            } else {
                dispatch(
                    setAlertMessage({
                        type: "error",
                        content: error?.data?.message,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const [resendOTP, { isLoading: isRequesting }] = useResendOTPMutation();
    const onOtpResend = async () => {
        try {
            setIsResent(true);
            setTimer(60);
            form.resetFields();
            const userEmail = { email: newEmail ? newEmail : email };
            const { data } = await resendOTP(userEmail);
            if (data?.success) {
                dispatch(
                    setAlertMessage({ type: "success", content: data?.message })
                );
            } else {
                dispatch(
                    setAlertMessage({ type: "error", content: data?.message })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <AuthComponentWrapper>
            <Form
                form={form}
                onFinish={onOtpVerify}
                className={`max-w-md w-full px-4`}
            >
                <div className={`text-center mb-8`}>
                    <h2 className={`form-tlt`}>Verify OTP</h2>
                    <p className={` dark:text-gray-300  text-gray-800`}>
                        {" "}
                        Please enter the verification code sent to{" "}
                        <span
                            className={`font-bold dark:text-white text-black`}
                        >
                            {" "}
                            {newEmail ? newEmail : email}{" "}
                        </span>
                    </p>
                </div>
                <Form.Item
                    name={"otpCode"}
                    rules={[
                        { required: true, message: "OTP is required!" },
                        {
                            pattern: /^\d{6}$/,
                            message: "Invalid OTP!",
                        },
                    ]}
                >
                    <OTPInput
                        value={otp}
                        onChange={(code) => setOtp(code)}
                        renderInput={(props) => (
                            <input {...props} type="number" maxLength={6} />
                        )}
                        numInputs={6}
                        separator={<span>-</span>}
                        shouldAutoFocus={true}
                        inputType={"number"}
                        containerStyle={"otp-form"}
                    />
                </Form.Item>

                <div className="flex flex-col my-6 gap-1 md:gap-3 items-center text-c26 ">
                    <p className={"text-sm dark:text-gray-300  text-gray-800"}>
                        Do not receive an OTP?
                    </p>
                    <p
                        className={`text-xl dark:text-gray-300  text-gray-800 ${
                            isResent ? "block" : "hidden"
                        } `}
                    >
                        {" "}
                        {timer} s{" "}
                    </p>
                    <CustomBtn
                        variant={"ghost"}
                        onClick={onOtpResend}
                        loading={isRequesting}
                        className={`text-base font-medium`}
                        disabled={isResent}
                    >
                        Resend OTP
                    </CustomBtn>
                </div>

                <CustomBtn
                    htmlType={"submit"}
                    className={`w-full`}
                    loading={isVerifying}
                >
                    Submit
                </CustomBtn>
                <Link
                    to={"/"}
                    className={` text-black dark:text-white w-fit mx-auto mt-10 flex items-center gap-1`}
                >
                    <MdOutlineArrowBack className={`text-lg`} /> Back
                </Link>
            </Form>
        </AuthComponentWrapper>
    );
};

export default VerifyOTP;
