import { BTLink } from "@/components";
const BlogTitlesList = ({ userBlogs, title }) => {
    return (
        <div className="font-medium p-5 rounded-md bg-white dark:bg-slate-700">
            {userBlogs?.length > 0 ? (
                <div className="flex flex-col md:flex-row items-start gap-5">
                    {" "}
                    <h3 className="min-w-[120px]"> {title} : </h3>
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
                </div>
            ) : (
                <p className="text-xl font-semibold">
                    {" "}
                    You haven't post any blogs yet!{" "}
                </p>
            )}
        </div>
    );
};

export default BlogTitlesList;
