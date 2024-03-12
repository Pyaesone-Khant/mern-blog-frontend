//auth
export {default as RegisterPage} from "./auth/Register";
export {default as LoginPage} from "./auth/Login";
export {default as ForgotPasswordPage} from "./auth/ForgotPassword.jsx"
export {default as ResetPasswordPage} from "./auth/ResetPassword.jsx";
export {default as VerifyOTPPage} from "./auth/VerifyOTP.jsx";

//blogs
export {default as BLWithPagination} from "./blogs/BlogsListWithPagination.jsx";
export {default as CreateBlog} from "./blogs/components/CreateBlogForm.jsx";
export {default as EditBlog} from "./blogs/components/EditBlogForm.jsx";
export {default as BlogDetail} from "./blogs/BlogDetail";
export {default as BLByCategory} from "./blogs/BlogsListByCategory.jsx";
export {default as BlogsList} from "./blogs/components/BlogsList.jsx";

//users
export {default as ADForm} from "./users/components/AccountDeleteForm.jsx";
export {default as UProfile} from "./users/UserProfile";
export {default as ChangeEmailPage} from "./users/components/ChangeEmailForm.jsx";
export {default as RSavedBlogs} from "./users/components/RecentlySavedBlogs.jsx";
export {default as SavedBlogs} from "./users/components/UserSavedBlogsList.jsx";
export {default as CreatedBlogs} from "./users/components/UserCreatedBlogsList.jsx";

// search
export {default as Search} from "./search/SearchedResult.jsx"

//categories
export {default as CatList} from "./categories/CategoriesList";
export {default as CatTable} from "./categories/CategoriesTable.jsx"
