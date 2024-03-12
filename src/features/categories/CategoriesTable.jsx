import React from 'react';
import {useGetAllCategoriesQuery} from "@/features/categories/categoriesApi.js";
import {Table} from "antd";
import NumberOfBlogsByCategory from "@/features/categories/components/NumberOfBlogsByCategory.jsx";
import EditCategory from "@/features/categories/components/EditCategory.jsx";
import NumberOfAuthorsByCategory from "@/features/categories/components/NumberOfAuthorsByCategory.jsx";
import AddNewCategory from "@/features/categories/components/AddNewCategory.jsx";

const CategoriesTable = () => {

    const {data: categories, isLoading} = useGetAllCategoriesQuery()


    const columns = [
        {
            title: 'Title',
            dataIndex: "title",
            key: 'title',
            align: "center"
        },
        {
            title: 'Number of Blogs',
            key: 'numberOfBlogs',
            render: (_, record) => <NumberOfBlogsByCategory categoryId={record?._id}/>
        },
        {
            title: "Number of Authors",
            key: "numberOfAuthors",
            render: (_, record) => <NumberOfAuthorsByCategory categoryId={record?._id}/>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => <EditCategory category={record}/>,
            align: "center"
        },
    ]

    return (
        <section className={`w-full space-y-5`}>
            <div className={`flex items-center justify-between`}>
                <h1 className={`text-xl font-semibold`}>Categories</h1>
                <AddNewCategory/>
            </div>
            <Table columns={columns} dataSource={categories} loading={isLoading} bordered={true}
                   rowKey={record => record?._id} pagination={{
                pageSize: 5,
            }}/>
        </section>
    );
};

export default CategoriesTable;
