import {useLocation, useNavigate} from "react-router-dom";
import {Form, Input} from "antd";
import {CancelBtn, FormLabel, SubmitBtn} from "@/components/index.js";
import {useState} from "react";
import {useChangeUserEmailMutation, useGetUserDataQuery} from "@/features/users/UserApi.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";


const ChangeEmailForm = () => {

    const {data : currentUser} = useGetUserDataQuery();
    const location = useLocation();
    const prevRoute = location?.state;

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [changeUserEmail] = useChangeUserEmailMutation()
    const onSubmit =  async (userData) => {
        try {
            setIsSubmitting(true);
            const {data} = await changeUserEmail(userData);
            console.log(data)
            if(data?.success){
                dispatch(setAlertMessage({type : "success", content : data?.message}))
                nav("/verifyOtp", {state : {newEmail : userData?.newEmail, prevRoute : location?.pathname, email : currentUser?.data?.email}})
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
                <div className="text-center mb-8">
                    <h2 className="form-tlt"> Change Email Address </h2>
                    <p className={` text-gray-500 dark:text-gray-300 text-sm`}> Enter your current password & new email address which you want to change!  </p>
                </div>

                <Form layout={"vertical"} onFinish={onSubmit}>
                    <Form.Item label={<FormLabel label={"email"}/>} name={"newEmail"} rules={[
                        {
                            required : true, message : "Email address is required!"
                        },{
                            type: "email",
                            pattern: /^([\w.]{4,10})+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Invalid email address!",
                        }
                    ]} >
                        <Input placeholder={"example@gmail.com"} type={"email"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"password"} />} name={"password"} rules={[
                        {required : true, message : "Password is required!"}
                    ]}>
                        <Input.Password placeholder={"Enter your current password"} />
                    </Form.Item>
                    <div className={`pt-6 flex items-center gap-5 `}>
                        <CancelBtn path={prevRoute}/>
                        <SubmitBtn
                            isSubmitting={isSubmitting}
                            label={"Confirm"}
                        />
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default ChangeEmailForm;
