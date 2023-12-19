import {useLocation, useNavigate} from "react-router-dom";
import OTPInput from "react-otp-input";
import {useEffect, useState} from "react";
import {SubmitBtn} from "@/components/index.js";
import {useResendOTPMutation, useVerifyOTPMutation} from "@/features/auth/authApi.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {logoutAccount, setLoginState} from "@/features/auth/authSlice.js";

const VerifyOTP = () => {
    const location = useLocation();
    const email = location?.state?.email;
    const prevRoute = location?.state?.prevRoute
    const newEmail = location?.state.newEmail;

    const [otp, setOtp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResent, setIsResent] = useState(false);
    const [timer, setTimer] = useState(60);

    const nav = useNavigate();
    const dispatch = useDispatch()

    // resend otp btn countdown
    useEffect(() => {
        let counter;
        if(isResent){
            counter = setInterval(decreaseTimer, 1000)
        }else{
            clearInterval(counter)
        }
        return () => clearInterval(counter);
    }, [timer, isResent]);

    const decreaseTimer = () => {
        if(timer > 0){
            setTimer(timer - 1)
        }else{
            setIsResent(false)
        }
    }
    
    const [verifyOTP] = useVerifyOTPMutation()
    const onOtpVerify = async (e) => {
        e.preventDefault()
        try {
            setIsSubmitting(true);
            const {data} = await verifyOTP({otp, email, newEmail});
            if(data?.success){
                if(prevRoute === "/forgotPassword"){
                    dispatch(setAlertMessage({type : "success", content : "OTP verified successfully!" }))
                    nav("/resetPassword", {state : {email}, replace: true});
                }else{
                    dispatch(setAlertMessage({type : "success", content : data?.message }))
                    dispatch(setLoginState({isLoggedIn : false, user : null, token : null}))
                    dispatch(logoutAccount())
                    nav("/login", {replace : true});
                }
            }else{
                dispatch(setAlertMessage({type : "error", content : data?.message}))
            }
        }catch (error){
            throw new Error(error);
        }finally {
            setIsSubmitting(false)
        }
    }

    const [resendOTP] = useResendOTPMutation();
    const onOtpResend = async () => {
        try {
            setIsResent(true);
            setTimer(60)
            setOtp("")
            const userEmail = {email : newEmail ? newEmail : email}
            const {data} = await resendOTP(userEmail);
            if(data?.success){
                dispatch(setAlertMessage({type : "success", content : data?.message}))
            }else{
                dispatch(setAlertMessage({type : "error", content : data?.message}))
            }
        }catch (error){
            throw new Error(error);
        }finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="flex items-center justify-center w-full">
            <div className="common-card">
               <div className={`text-center mb-8`}>
                     <h2 className={`form-tlt`}>Verify OTP</h2>
                   <p  > Please enter the verification code sent to <span className={`font-bold`} > {newEmail ? newEmail : email} </span> </p>
               </div>
                
                <form onSubmit={onOtpVerify} >
                    <OTPInput
                        value={otp}
                        onChange={(code) => setOtp(code)}
                        renderInput={(props) => <input {...props} type="number" maxLength={6} />}
                        numInputs={6}
                        separator={<span>-</span>}
                        shouldAutoFocus={true}
                        inputType={"number"}
                    containerStyle={"otp-form"}/>

                    <div className="flex flex-col my-8 gap-1 md:gap-3 items-center text-c26 ">
                        <p className={"text-sm"}>Do not receive an OTP?</p>
                        <p className={`text-xl ${isResent ? "block" : "hidden"} `}>
                            {" "}
                            {timer} s{" "}
                        </p>
                        <button
                            onClick={onOtpResend}
                            type="button"
                            disabled={isResent}
                            className={`font-semibold  ${
                                isResent
                                    ? " text-[#20C]/50 dark:text-darkHead/50 "
                                    : "text-[#20C] dark:text-darkHead "
                            } duration-200 disabled:cursor-not-allowed `}
                        >
                            {" "}
                            Resend OTP!{" "}
                        </button>
                    </div>

                    <SubmitBtn label={"Verify"} isSubmitting={isSubmitting}/>
                </form>
            </div>
        </section>
    );
};

export default VerifyOTP;
