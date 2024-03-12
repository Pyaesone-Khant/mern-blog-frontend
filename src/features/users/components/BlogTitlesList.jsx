import {BTLink} from "@/components/index.js";

const BlogTitlesList = ({userBlogs, title, isSaved}) => {
    return (
        <div className="font-medium p-5 rounded-md bg-cBlue/10 dark:bg-darkTer/10">
            <div className="flex flex-col md:flex-row items-start gap-5">
                {" "}
                <h3 className="min-w-[120px]"> {title} : </h3>
                {userBlogs?.length > 0 ? (
                    <ul className=" list-inside list-decimal flex flex-col gap-1">
                        {userBlogs?.map((blog) => {
                            return (
                                <BTLink
                                    key={blog?._id}
                                    title={blog?.title}
                                    blogId={blog?._id}
                                />
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-lg font-medium">
                        {" "}
                        You haven&apos;t {isSaved ? "saved" : "posted"} any blogs yet!{" "}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BlogTitlesList;
