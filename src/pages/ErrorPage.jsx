import {Link} from "react-router-dom";
import {cn} from "@/utils.js";
import {Logo} from "@/components/index.js";

const ErrorPage = ({type}) => {
    return (
        <section
            className={cn("fixed z-[999] w-full h-full top-0 left-0 bg-white dark:bg-darkBgSec flex items-center justify-center")}>

            <div
                className={`mx-auto max-w-5xl w-full flex flex-col md:flex-row md:gap-10 gap-5 items-center justify-center md:justify-evenly`}>
                <div className={`w-full flex items-center justify-center md:justify-end`}>
                    <Link to={"/"} className={`w-fit bg-black/[0.05] p-5 rounded-sm`}>
                        <Logo className={` w-full max-w-[200px] md:max-w-sm`}/>
                    </Link>
                </div>

                <div className=" flex flex-col md:gap-8 gap-4 w-full text-center md:text-left">
                    <p className={`uppercase`}>Page not found</p>
                    <h2 className="text-[100px] font-bold leading-[60px] text-gray-600 dark:text-gray-400"> 404 </h2>
                    <p className="text-4xl font-semibold">
                        Out of nothing, <br/> something.
                    </p>
                    <p className={`px-14 md:px-0`}>
                        You can find (just about) anything on Write — apparently even a page that doesn&apos;t exist.
                        Maybe
                        these stories about finding what you didn&apos;t know you were looking for will take you
                        somewhere
                        new?
                    </p>
                    <Link
                        to={".."}
                        className="underline underline-offset-2 w-fit mx-auto md:mx-0 text-cBlue dark:text-darkTer"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
