import { CustomBtn } from "@/components";

const BlogNotFound = () => {
    const handleTryAgain = () => {
        if (window) {
            window.location.reload();
        }
    };

    return (
        <section
            className={`flex flex-col gap-4 flex-1 items-center justify-center rounded-md bg-cBlue/10 dark:bg-darkTer/10 p-4 text-center`}
        >
            <h2 className="font-semibold text-xl">Something went wrong!</h2>
            <p className="text-sm px-4">
                No blogs found! Please check your network connection & try
                again.
            </p>
            <CustomBtn size="sm" onClick={handleTryAgain}>
                Try Again
            </CustomBtn>
        </section>
    );
};

export default BlogNotFound;
