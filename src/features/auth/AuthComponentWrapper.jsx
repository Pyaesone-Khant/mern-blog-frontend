// components
import {CustomBtn, Logo} from "@/components/index.js";
import ThemeBtn from "@/components/antd/btns/ThemeBtn.jsx";

const AuthComponentWrapper = ({children}) => {
    return (
        <section
            className=" fixed top-0 left-0 h-full flex flex-col md:flex-row md:items-center justify-center w-full z-50 gap-4 lg:gap-12 bg-white dark:bg-darkBgSec duration-200 ">
            <div className={`fixed top-0 left-0 w-full`}>
                <div
                    className={`px-10 max-w-5xl mx-auto py-2 flex items-center justify-between duration-200`}
                >
                    <CustomBtn
                        isLink={true}
                        href={"/"}
                        variant={"ghost"}
                        className={`w-fit px-1 gap-1 text-xl font-bold !text-black dark:!text-white`}
                    >
                        Writee
                    </CustomBtn>
                    <ThemeBtn/>
                </div>
            </div>
            <div className={`w-full flex items-center justify-end `}>
                <Logo
                    className={` md:max-w-sm md:max-h-96 w-full h-full max-w-[80px] max-h-20 xl:mx-0`}
                />
            </div>
            <div
                className={
                    "w-full flex items-center justify-center md:justify-start px-4"
                }
            >
                {children}
            </div>
        </section>
    );
};

export default AuthComponentWrapper;
