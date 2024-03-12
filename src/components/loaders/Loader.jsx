import "./loader.css";

const Loader = () => {
    return (
        <section className={`flex flex-1 items-center justify-center`}>
            <div className="line-wobble dark:before:bg-white dark:after:bg-white"></div>
        </section>
    );
};

export default Loader;
