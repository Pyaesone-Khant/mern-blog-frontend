import { useCallback, useEffect, useState } from "react";

//icons
import { MdCheckCircle } from "react-icons/md";

// components
import { Loader } from "@/components/index.js";
import { BlogsList, CatList, RSavedBlogs } from "@/features";

// apis
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi";
import axios from "axios";

// hooks
import { useResponsive } from "@/hooks/useResponsive.js";

//utils
import { BCLoader } from "../components";

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
                import.meta.env.VITE_PROD_API_URL + `/blogs?page=${page}&size=3`
            )
            .then((res) => {
                const fetchedBlogs = res?.data?.data || [];
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
            setIsLoading(true);
            axios
                .get(import.meta.env.VITE_PROD_API_URL + "/blogs?page=1&size=3")
                .then((res) => {
                    const blogs = res.data?.data;
                    setBlogs(blogs);
                    setTotalPages(Math.ceil(res.data?.totalBlogs / 3));
                })
                .catch((err) => {
                    console.log(err);
                });
            setIsLoading(false);
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
                    {isLoading && page !== totalPages && <BCLoader />}
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
