import { Link } from "react-router-dom";

const ErrorPage = ({ type }) => {
    return (
        <section className=" flex items-center justify-center w-full text-black dark:text-white duration-200">
            <div className=" flex flex-col gap-10 text-center">
                <h2 className="text-6xl font-bold"> Oops! </h2>
                <p className="text-2xl font-semibold">
                    {" "}
                    Sorry, the {type} you were looking for is not found!
                </p>
                <Link
                    to={".."}
                    className="px-5 py-2 rounded-md bg-red-800 text-white hover:bg-red-700 duration-200 w-fit mx-auto"
                >
                    {" "}
                    Go Back{" "}
                </Link>
            </div>
        </section>
    );
};

export default ErrorPage;
