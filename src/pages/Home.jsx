// components
import { Loader } from "@/components/index.js";
import { BlogsList, CatList, RSavedBlogs } from "@/features";

// apis
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi";
import axios from "axios";

// hooks
import { useResponsive } from "@/hooks/useResponsive.js";
import { cn } from "@/utils";
import { Skeleton } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(2);

    const { isMediumDevice } = useResponsive();

    const fetchData = useCallback(async () => {
        if (isLoading) return;
        if (page > totalPages) return;
        setIsLoading(true);

        await axios
            .get(
                import.meta.env.VITE_LOCAL_API_URL +
                    `/blogs?page=${page}&size=3`
            )
            .then((res) => {
                const fetchedBlogs = res?.data?.data;
                setBlogs((prev) => [...prev, ...fetchedBlogs]);
            })
            .catch((err) => {
                console.log(err);
            });
        setPage((prev) => prev + 1);
        setIsLoading(false);
    }, [page, isLoading, totalPages]);

    useEffect(() => {
        try {
            axios
                .get(
                    import.meta.env.VITE_LOCAL_API_URL + "/blogs?page=1&size=3"
                )
                .then((res) => {
                    const blogs = res.data?.data;
                    setBlogs(blogs);
                    setTotalPages(res.data?.totalPages);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                fetchData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchData]);

    const { data: categories, isLoading: isCLoading } =
        useGetAllCategoriesQuery();

    if (isCLoading) return <Loader />;

    return (
        <section className=" flex flex-col w-full max-w-7xl mx-auto gap-4 ">
            <CatList categories={categories} />
            <div
                className={`flex flex-1 md:items-stretch lg:gap-10 gap-5 justify-between`}
            >
                <div className="w-full">
                    <BlogsList blogs={blogs} />
                    {isLoading && (
                        <div className="mt-6 space-y-6">
                            {Array(3)
                                .fill(null)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "border-b border-black/20 dark:border-white/20 pb-5 flex items-center md:gap-10 gap-4"
                                        )}
                                    >
                                        <div className={`w-full space-y-2`}>
                                            <Skeleton
                                                active
                                                avatar={{
                                                    className: `!w-8 !h-8 rounded-full`,
                                                }}
                                                title={{
                                                    className: `!h-6 rounded-sm max-w-[180px] !my-0`,
                                                }}
                                                paragraph={false}
                                                className={`flex items-center`}
                                            />
                                            <Skeleton
                                                active
                                                title={{
                                                    className: `!h-8 rounded-sm !w-full md:max-w-[80%] max-w-[90%] !my-0`,
                                                }}
                                                paragraph={{
                                                    rows: 3,
                                                }}
                                                className={`flex items-center`}
                                            />
                                            <Skeleton.Button
                                                className={`mt-2 max-w-[100px] !w-full !rounded-full`}
                                                size={"small"}
                                            />
                                        </div>
                                        <Skeleton.Image
                                            active={true}
                                            className={cn(
                                                "!w-full !max-w-[120px] !h-full max-h-[120px] !aspect-square"
                                            )}
                                        />
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                {!isMediumDevice && (
                    <div
                        className={`w-[1px] self-stretch border-l border-black/20 dark:border-white/20`}
                    ></div>
                )}
                {!isMediumDevice && <RSavedBlogs />}
            </div>

            {!isLoading && page > totalPages && (
                <p className=" w-full flex items-center justify-center gap-2 text-sm py-4">
                    {" "}
                    <MdCheckCircle className="text-xl text-cBlue dark:text-darkTer" />{" "}
                    You have all caught up!{" "}
                </p>
            )}
        </section>
    );
};

export default Home;
