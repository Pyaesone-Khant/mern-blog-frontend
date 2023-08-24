const CategoryBtn = ({ title, event, isActive, id }) => {
    return (
        <button
            onClick={() => event(id, title)}
            className={` ${
                isActive === id
                    ? " bg-blue-600 dark:bg-darkTer text-white"
                    : " bg-white text-blue-600 dark:bg-slate-700 dark:text-darkTer  "
            }  py-2 px-3 rounded-md shadow  duration-200 hover:shadow-lg min-w-max md:w-full `}
        >
            {" "}
            {title}{" "}
        </button>
    );
};

export default CategoryBtn;
