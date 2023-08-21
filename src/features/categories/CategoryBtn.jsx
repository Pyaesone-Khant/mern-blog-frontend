const CategoryBtn = ({ title, event, isActive, id }) => {
    return (
        <button
            onClick={() => event(id, title)}
            className={` ${
                isActive === id ? " bg-blue-600 text-white" : " bg-white "
            }  py-2 px-3 rounded-md shadow duration-200 hover:shadow-lg min-w-max md:w-full `}
        >
            {" "}
            {title}{" "}
        </button>
    );
};

export default CategoryBtn;
