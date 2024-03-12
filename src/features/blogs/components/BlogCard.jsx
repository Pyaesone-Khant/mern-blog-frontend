import {useGetUserByIdQuery} from "../../users/UserApi.js";
import {useGetCategoryByIdQuery} from "../../categories/categoriesApi.js";
import {memo, useEffect, useState} from "react";
import {Skeleton, Tag} from "antd";
import Author from "./Author.jsx";
import {Link} from "react-router-dom";
import {cn, formatDate} from "@/utils.js";
import BlogCardFooter from "@/features/blogs/components/BlogCardFooter.jsx";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {useResponsive} from "@/hooks/useResponsive.js";
import {useAuth} from "@/hooks/useAuth.js";

let BlogCard = ({blog, isDetail, isRecommended}) => {
    const {_id: blogId, blogImage, userId, createdAt, categoryId, title} = blog;

    const [linkProps, setLinkProps] = useState({});//[to, state, onClick]
    const {token} = useAuth();
    const date = formatDate(createdAt)
    const titleSlug = useSlugChanger(title) || null;
    const {currentUser} = useCurrentUser();
    const {isMobile} = useResponsive();

    const {data: author, isLoading: isULoading} = useGetUserByIdQuery(
        userId
    );
    const nameSlug = useSlugChanger(author?.name) || null;

    const isUserAuth = currentUser?._id === author?._id && token;

    const {data: blogCategory, isLoading: isCLoading} =
        useGetCategoryByIdQuery(categoryId, {
            skip: !categoryId
        });


    useEffect(() => {
        if (nameSlug && titleSlug) {
            setLinkProps({
                to: (nameSlug && titleSlug) && `/${nameSlug}/${titleSlug}`,
                state: blogId,
                onClick: changeRoute
            })
        }
    }, [nameSlug, titleSlug])

    const changeRoute = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }


    if (isULoading || isCLoading) {
        return (
            <div className={cn({
                "pb-5 border-b border-black/20 dark:border-white/20 flex items-center md:gap-10 gap-4": !isDetail && !isRecommended
            })}>
                <div className={`w-full space-y-1`}>
                    <Skeleton active avatar={{
                        className: `!w-10 !h-10 rounded-full`
                    }}
                              title={{
                                  className: `!h-6 rounded-sm max-w-[180px] !my-0`
                              }}
                              paragraph={false}
                              className={`flex items-center`}
                    />
                    <Skeleton active title={{
                        className: `!h-8 rounded-sm !w-full md:max-w-[80%] max-w-[90%] !my-0`
                    }}
                              paragraph={{
                                  rows: isMobile ? 3 : 4
                              }}
                              className={`flex items-center`}
                    />
                    <Skeleton.Button className={`mt-2 max-w-[100px] !w-full !rounded-full`} size={"small"}/>
                </div>
                <Skeleton.Image active={true}
                                className={` !w-full !max-w-[120px] !h-full max-h-[120px] !aspect-square`}/>
            </div>
        );
    }

    return <section className={cn({
        "pb-5 border-b border-black/20 dark:border-white/20": !isDetail && !isRecommended,
        "max-w-2xl mx-auto w-full": isDetail,
        "pb-4 border-b dark:border-white/10 duration-200": isRecommended
    })}>
        {
            isDetail && <h2 className={cn(`capitalize font-bold w-fit md:text-5xl text-3xl`)}> {blog?.title} </h2>
        }
        <div className={cn("flex flex-row items-center gap-1 mb-2", {
            "mt-4": isDetail
        })}>
            <Author author={author} isDetail={isDetail}/>
            <p className={`text-xs dark:text-gray-300 text-gray-600 font-grm`}>· {date} </p>
            {isUserAuth && <div className={`ml-3 inline-block h-fit`}>
                <Tag color="success"
                     className={`w-fit hidden dark:block`}> You </Tag>
                <Tag color="processing"
                     className={`w-fit dark:hidden`}> You </Tag>
            </div>}
        </div>
        <div
            className={cn("flex justify-between gap-10", {"flex-col gap-4": isDetail || (isRecommended && !isMobile)})}>
            <div className={`w-full space-y-3`}>
                <article className={cn("space-y-1")}>
                    {!isDetail && <Link {...linkProps}
                                        className={cn(`capitalize font-bold text-lg md:text-xl w-fit cursor-pointer`, {" line-clamp-1 ": isRecommended})}> {blog?.title} </Link>}

                    {/* description */}
                    <Link {...linkProps} className={cn(`text-sm leading-6 dark:text-gray-400 font-medium
                `, {
                        "whitespace-pre-line text-justify pointer-events-none": isDetail,
                        "md:line-clamp-3 line-clamp-2 cursor-pointer": !isDetail
                    })}> {blog?.description} </Link>
                </article>
                <BlogCardFooter blog={blog} blogCategory={blogCategory}/>
            </div>
            <Link {...linkProps}
                  className={cn(` overflow-hidden rounded-sm bg-gray-200`, {
                      " min-h-max pointer-events-none w-full mt-2": isDetail,
                      "max-w-[100px] min-h-max md:max-w-[120px] w-full cursor-pointer self-start ": !isDetail && (!isRecommended || isMobile),
                      "aspect-[5/3]": isRecommended && !isMobile
                  })}>
                <img
                    src={blogImage ? blogImage : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                    alt={`${title} Image`}
                    className={cn("h-full w-full object-cover object-center border dark:border-none", {
                        "cursor-pointer aspect-square": !isDetail,
                        "aspect-[5/3]": (isRecommended && !isMobile)
                    })}/>
            </Link>
        </div>
    </section>
};

BlogCard = memo(BlogCard);

export default BlogCard;
