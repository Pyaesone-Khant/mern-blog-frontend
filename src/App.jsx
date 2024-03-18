import {useEffect} from "react";

// components
import MainLayout from "@/layouts/MainLayout";
import {
    ADForm,
    BLByCategory,
    BlogDetail,
    CatTable,
    ChangeEmailPage,
    CreateBlog,
    CreatedBlogs,
    EditBlog,
    ForgotPasswordPage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    SavedBlogs,
    Search,
    UProfile,
    VerifyOTPPage,
} from "@/features";
import {ErrorPage, HomePage} from "./pages";
import {IsAdmin, IsAuth, IsNotAuth, OTPGuard} from "@/components";

// router
import {Route, Routes} from "react-router-dom";

// antd
import {ConfigProvider, notification} from "antd";

// redux
import {setAlertMessage} from "@/core/globalSlice.js";
import {useDispatch, useSelector} from "react-redux";

const App = () => {

    const {alertMsg} = useSelector(state => state.global)
    const [api, contextHolder] = notification.useNotification()
    const dispatch = useDispatch()

    const openNotificationWithIcon = () => {
        api[alertMsg.type]({
            message: alertMsg.content,
            duration: 3,
            placement: "top",
        });
    };

    useEffect(() => {
        if (alertMsg.type && alertMsg.content) {
            openNotificationWithIcon()
            setTimeout(() => {
                dispatch(setAlertMessage({type: null, content: null}))
            }, 5000)
        }
    }, [alertMsg]);

    return (
        <ConfigProvider theme={{
            components: {
                Input: {
                    controlHeight: 40,
                    fontFamily: "Raleway",
                    fontSize: 16,
                    borderRadius: 2,
                },
                Button: {
                    controlHeight: 40,
                    primaryShadow: false
                },
                Select: {
                    controlHeight: 40,
                    fontFamily: "Raleway",
                    fontSize: 16,
                    borderRadius: 2,
                },
            }
        }}>
            {contextHolder}
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>

                    <Route path={"/tag/:tagSlug"} element={<BLByCategory/>}/>

                    <Route
                        path="write"
                        element={
                            <IsAuth>
                                <CreateBlog/>
                            </IsAuth>
                        }
                    />
                    <Route path="/:username/:slug" errorElement={<ErrorPage/>}>
                        <Route index element={<BlogDetail/>}/>
                        <Route
                            path="edit"
                            element={
                                <IsAuth>
                                    <EditBlog/>
                                </IsAuth>
                            }
                        />
                    </Route>

                    <Route path={"/categories"} element={<IsAdmin>
                        <CatTable/>
                    </IsAdmin>}/>

                    <Route path={"/search"} element={<Search/>}/>

                    <Route path={"changeEmail"} element={<IsAuth>
                        <ChangeEmailPage/>
                    </IsAuth>}/>

                    <Route
                        path="delete_account"
                        element={
                            <IsAuth>
                                <ADForm/>
                            </IsAuth>
                        }
                    />

                    <Route path="/users/:slug">
                        <Route index element={<UProfile/>}/>
                        <Route path={"blogs"} element={<IsAuth>
                            <CreatedBlogs/>
                        </IsAuth>}/>
                        <Route path={"saved"} element={<IsAuth>
                            <SavedBlogs/>
                        </IsAuth>}/>
                    </Route>
                    {/* user routes end */}

                    {/* auth routes */}
                    <Route
                        path="register"
                        element={
                            <IsNotAuth>
                                <RegisterPage/>
                            </IsNotAuth>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <IsNotAuth>
                                <LoginPage/>
                            </IsNotAuth>
                        }
                    />

                    <Route path={"forgotPassword"} element={<IsNotAuth>
                        <ForgotPasswordPage/>
                    </IsNotAuth>}/>

                    <Route path={"resetPassword"} element={<IsNotAuth>
                        <OTPGuard>
                            <ResetPasswordPage/>
                        </OTPGuard>
                    </IsNotAuth>}/>

                    <Route path={"verifyOtp"} element={
                        <OTPGuard>
                            <VerifyOTPPage/>
                        </OTPGuard>}/>

                    {/* auth routes end */}
                    <Route path="*" element={<ErrorPage type={"page"}/>}/>
                </Route>
            </Routes>
        </ConfigProvider>
    );
};

export default App;
