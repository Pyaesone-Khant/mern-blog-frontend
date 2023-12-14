import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
    CreateBlog,
    LoginPage,
    RegisterPage,
    BlogDetail,
    EditBlog,
    CUserD,
    ADForm,
    UProfile, ForgotPasswordPage, ResetPasswordPage, VerifyOTPPage, ChangeEmailPage,
} from "@/features";
import { ErrorPage, HomePage } from "./pages";
import {IsAuth, IsNotAuth, OTPGuard} from "@/components";
import {useDispatch, useSelector} from "react-redux";
import {ConfigProvider, notification} from "antd";
import {useEffect} from "react";
import {setAlertMessage} from "@/core/globalSlice.js";
import "@/core/css/antdConfig.css"

const App = () => {

    const {alertMsg} = useSelector(state => state.global)
    const [api, contextHolder] = notification.useNotification()
    const dispatch = useDispatch()

    const openNotificationWithIcon = () => {
        api[alertMsg.type]({
            message: alertMsg.content,
            duration : 5,
            placement: "top",
             });
    };

    useEffect(() => {
        if(alertMsg.type && alertMsg.content){
         openNotificationWithIcon()
            setTimeout(() => {
                dispatch(setAlertMessage({type: null, content : null}))
            }, 5000)
        }
    }, [alertMsg]);

    return (
        <ConfigProvider theme={{
            components: {
                Input : {
                    controlHeight : 40,
                    fontFamily : "Montserrat",
                    fontSize : 16,
                },
                Button: {
                    controlHeight : 40,
                    primaryShadow : false
                },
                Select : {
                    controlHeight: 40,
                    fontFamily: "Montserrat",
                    fontSize : 16,
                }
            }
        }} >
                {contextHolder}
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />

                        <Route
                            path="create_blog"
                            element={
                                <IsAuth>
                                    <CreateBlog />
                                </IsAuth>
                            }
                        />
                        <Route path="blogs/:blogId" errorElement={<ErrorPage />}>
                            <Route index element={<BlogDetail />} />
                            <Route
                                path="edit"
                                element={
                                    <IsAuth>
                                        <EditBlog />
                                    </IsAuth>
                                }
                            />
                        </Route>

                        {/* user routes */}
                        <Route
                            path="change_profile"
                            element={
                                <IsAuth>
                                    <CUserD />
                                </IsAuth>
                            }
                        />

                        <Route path={"changeEmail"} element={<IsAuth>
                            <ChangeEmailPage/>
                        </IsAuth>} />

                        <Route
                            path="delete_account"
                            element={
                                <IsAuth>
                                    <ADForm />
                                </IsAuth>
                            }
                        />

                        <Route path="profile/:userId" element={<UProfile />} />
                        {/* user routes end */}

                        {/* auth routes */}
                        <Route
                            path="register"
                            element={
                                <IsNotAuth>
                                    <RegisterPage />
                                </IsNotAuth>
                            }
                        />
                        <Route
                            path="login"
                            element={
                                <IsNotAuth>
                                    <LoginPage />
                                </IsNotAuth>
                            }
                        />

                        <Route path={"forgotPassword"} element={<IsNotAuth>
                            <ForgotPasswordPage/>
                        </IsNotAuth>} />

                        <Route path={"resetPassword"} element={<IsNotAuth>
                            <OTPGuard>
                                <ResetPasswordPage/>
                            </OTPGuard>
                        </IsNotAuth>} />

                        <Route path={"verifyOtp"} element={
                            <OTPGuard>
                                <VerifyOTPPage/>
                            </OTPGuard>} />

                        {/* auth routes end */}
                        <Route path="*" element={<ErrorPage type={"page"} />} />
                    </Route>
                </Routes>
        </ConfigProvider>
    );
};

export default App;
