import { useCallback, useEffect, useRef, useState } from "react";

//icons
import { MdCheckCircle } from "react-icons/md";

// components
import { Loader } from "@/components";
import { BlogCard, CatList, RSavedBlogs } from "@/features";

// apis
import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApi";

// hooks
import { useResponsive } from "@/hooks/useResponsive.js";

//axios
import axios from "axios";

const BASE_URL = import.meta.env.VITE_PROD_API_URL;

const Home = () => {
    // using js intersection observer api
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageN, setPageN] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const observer = useRef();

    const { isMediumDevice } = useResponsive();
    const lastData = useCallback((node) => {
        if (node != null) {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting) {
                    setPageN((prev) => prev + 1);
                }
            }, {
                threshold: 1
            });
            observer.current.observe(node);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(BASE_URL + "/blogs?page=1&size=3").then((res) => {
                    setTotalPages(Math.ceil(res.data?.totalBlogs / 3));
                }).catch(err => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(BASE_URL + `/blogs?page=${pageN}&size=3`).then((res) => {
                    const fetchedData = res.data?.data || [];
                    setData((prev) => [...prev, ...fetchedData]);
                }).catch(err => {
                    console.log(err);
                })
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [
        pageN
    ])
    const { data: categories, isLoading: isCLoading } =
        useGetAllCategoriesQuery();

    if (isCLoading) return <Loader />;

    return <section className=" flex flex-col w-full max-w-7xl mx-auto gap-4 ">
        <CatList categories={categories} />
        <div className={`flex flex-1 md:items-stretch lg:gap-10 gap-5 justify-between`}>
            <div className="space-y-4 w-full">

                {
                    data?.length ? data.map((blog, index) => <div key={blog._id} ref={index === data?.length - 1 ? lastData : null} className="animate__fadeIn" >
                        <BlogCard blog={blog} />
                    </div>) : null
                }

                {
                    loading && pageN !== 1 && <div className="loader3 pt-6">
                        <div className="circle1"></div>
                        <div className="circle1"></div>
                        <div className="circle1"></div>
                        <div className="circle1"></div>
                        <div className="circle1"></div>
                    </div>

                }

                {
                    !loading && pageN !== 1 && pageN > totalPages && <p className=" w-full flex items-center justify-center gap-2 text-sm py-4">
                        {" "}
                        <MdCheckCircle className="text-xl text-cBlue dark:text-darkTer" />{" "}
                        You have all caught up!{" "}
                    </p>
                }
            </div>
            {!isMediumDevice && (
                <div
                    className={`w-[1px] self-stretch border-l border-black/20 dark:border-white/20`}
                ></div>
            )}
            {!isMediumDevice && <RSavedBlogs />}
        </div>


    </section>
};

export default Home;
