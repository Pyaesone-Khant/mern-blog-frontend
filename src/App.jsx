import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
    CreateBlog,
    LoginPage,
    RegisterPage,
    BlogDetail,
    EditBlog,
} from "@/features";
import { ErrorPage, HomePage } from "./pages";
import { IsAuth, IsNotAuth } from "@/components";
import { CPForm, CUserD, UBlogs } from "./features";

const App = () => {
    return (
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
                <Route path="users/:userId" element={<UBlogs />} />
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
                {/* auth routes end */}
                <Route path="*" element={<ErrorPage type={"page"} />} />
            </Route>
        </Routes>
    );
};

export default App;
