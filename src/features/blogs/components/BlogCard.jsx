import { memo } from "react";

// assets
import { NoImage } from "@/assets/index.js";

// components
import { BCLoader } from "@/components/index.js";
import BlogCardFooter from "@/features/blogs/components/BlogCardFooter.jsx";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import Author from "./Author.jsx";

// utils
import { cn, formatDate } from "@/utils.js";

// hooks
import { useAuth } from "@/hooks/useAuth.js";
import { useCurrentUser } from "@/hooks/useCurrentUser.js";
import { useResponsive } from "@/hooks/useResponsive.js";
import { useSlugChanger } from "@/hooks/useSlugChanger.js";

// apis
import { useGetCategoryByIdQuery } from "@/features/categories/categoriesApi.js";
import { useGetUserByIdQuery } from "@/features/users/UserApi.js";

let BlogCard = ({ blog, isDetail, isRecommended }) => {
    const {
        _id: blogId,
        blogImage,
        userId,
        createdAt,
        categoryId,
        title,
    } = blog;

    const { token } = useAuth();
    const date = formatDate(createdAt);
    const titleSlug = useSlugChanger(title) || null;
    const { currentUser } = useCurrentUser();
    const { isMobile } = useResponsive();

    const { data: author, isLoading: isULoading } = useGetUserByIdQuery(userId);
    const nameSlug = useSlugChanger(author?.name) || null;

    const isUserAuth = currentUser?._id === author?._id && token;

    const { data: blogCategory, isLoading: isCLoading } =
        useGetCategoryByIdQuery(categoryId, {
            skip: !categoryId,
        });

    const changeRoute = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const linkProps = {
        to: nameSlug && titleSlug && `/${nameSlug}/${titleSlug}`,
        state: blogId,
        onClick: changeRoute,
    }

    if (isULoading || isCLoading)
        return <BCLoader isDetail={isDetail} isRecommended={isRecommended} />;

    return (
        <section
            className={cn({
                "pb-5 border-b border-black/20 dark:border-white/20":
                    !isDetail && !isRecommended,
                "max-w-2xl mx-auto w-full": isDetail,
                "pb-4 border-b dark:border-white/10 duration-200":
                    isRecommended,
            })}
        >
            {isDetail && (
                <h2
                    className={cn(
                        `capitalize font-bold w-fit md:text-5xl text-3xl`
                    )}
                >
                    {" "}
                    {blog?.title}{" "}
                </h2>
            )}
            <div
                className={cn("flex flex-row items-center gap-1 mb-2", {
                    "mt-4": isDetail,
                })}
            >
                <Author author={author} isDetail={isDetail} />
                <p
                    className={`text-xs dark:text-gray-300 text-gray-600 font-grm`}
                >
                    · {date}{" "}
                </p>
                {isUserAuth && (
                    <div className={`ml-3 inline-block h-fit`}>
                        <Tag
                            color="success"
                            className={`w-fit hidden dark:block`}
                        >
                            {" "}
                            You{" "}
                        </Tag>
                        <Tag color="processing" className={`w-fit dark:hidden`}>
                            {" "}
                            You{" "}
                        </Tag>
                    </div>
                )}
            </div>
            <div
                className={cn("flex justify-between gap-10", {
                    "flex-col gap-4": isDetail || (isRecommended && !isMobile),
                })}
            >
                <div className={`w-full flex flex-col gap-3`}>
                    <article className={cn("space-y-1")}>
                        {!isDetail && (
                            <Link
                            {...linkProps}
                                className={cn(
                                    `capitalize font-bold text-lg md:text-xl w-fit cursor-pointer !text-black dark:!text-white`,
                                    { " line-clamp-1 ": isRecommended }
                                )}
                            >
                                {" "}
                                {blog?.title}{" "}
                            </Link>
                        )}

                        {/* description */}
                        <Link
                            {...linkProps}
                            className={cn(
                                `text-sm leading-6 !text-gray-600 dark:!text-gray-300 font-medium
                `,
                                {
                                    "whitespace-pre-line text-justify pointer-events-none":
                                        isDetail,
                                    "md:line-clamp-3 line-clamp-2 cursor-pointer":
                                        !isDetail,
                                }
                            )}
                        >
                            {" "}
                            {blog?.description}{" "}
                        </Link>
                    </article>
                    <BlogCardFooter blog={blog} blogCategory={blogCategory} />
                </div>
                <Link
                    {...linkProps}
                    className={cn(
                        ` overflow-hidden rounded-sm bg-gray-200 dark:bg-black/50`,
                        {
                            "md:min-h-[360px] min-h-[160px] pointer-events-none w-full mt-2 object-cover object-center":
                                isDetail,
                            "max-w-[100px] min-h-max md:max-w-[120px] w-full cursor-pointer self-start   ":
                                !isDetail && (!isRecommended || isMobile),
                            "aspect-[16/9]": isRecommended && !isMobile,
                        }
                    )}
                >
                    <img
                        src={blogImage ? blogImage : NoImage}
                        alt={`${title} Image`}
                        className={cn(
                            "h-full w-full object-cover object-center border dark:border-none",
                            {
                                "cursor-pointer aspect-square": !isDetail,
                                "aspect-[5/3]": isRecommended && !isMobile,
                            }
                        )}
                    />
                </Link>
            </div>
        </section>
    );
};

BlogCard = memo(BlogCard);

export default BlogCard;
