import { Loader } from "@/components/index.js";
import { useGetSearchedDataQuery } from "@/features/auth/authApi";
import Author from "@/features/blogs/components/Author";
import CategoryBtn from "@/features/categories/CategoryBtn";
import { BlogsList } from "@/features/index.js";
import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";

const SearchedResult = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get("q")

    const { data: searchedData, isLoading, isFetching } = useGetSearchedDataQuery(keyword, {
        skip: !keyword,
    });

    const blogs = searchedData?.blogs;
    const authors = searchedData?.users;
    const categories = searchedData?.categories;


    const tabs = [
        {
            key: "1",
            label: "Blogs",
            children: <BlogsList blogs={blogs} loading={false} />
        },
        {
            key: "2",
            label: "Authors",
            children: <div>
                {
                    authors?.length ? <div className="space-y-2">
                        {
                            authors?.map(author => <div key={author?._id}
                                className={`p-3 rounded-sm hover:bg-black/[0.05] dark:hover:bg-white/10 duration-200`}>
                                <Author author={author} isComment={true} />
                            </div>)
                        }
                    </div> : <p className={`p-20 text-center text-gray-600 dark:text-gray-400 text-base`}>
                        No author found!
                    </p>
                }
            </div>
        },
        {
            key: "3",
            label: "Categories",
            children: <div>
                {
                    categories?.length ? <div className="flex flex-wrap gap-2">
                        {
                            categories?.map(category => <CategoryBtn key={category?._id} category={category} />)
                        }
                    </div> : <p className={`p-20 text-center text-gray-600 dark:text-gray-400 text-base`}>
                        No category found!
                    </p>
                }
            </div>
        },
    ]

    return <section className={`flex flex-col flex-1 max-w-6xl mx-auto`}>
        <h2 className={`text-2xl font-semibold`}>
            Result for &quot;{keyword}&quot;
        </h2>
        {
            isLoading ? <Loader /> : <Tabs defaultActiveKey="blogs" items={tabs} className={`mt-4`} />
        }
    </section>
};


export default SearchedResult;
