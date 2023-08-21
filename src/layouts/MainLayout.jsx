import { Outlet } from "react-router-dom";
import { Footer, Nav } from "../components";

const MainLayout = () => {
    return (
        <main className="flex flex-col dark:bg-slate-800 dark:text-white bg-gray-100 text-slate-900 min-h-screen">
            <Nav />
            {/* navbar */}

            <section className=" flex-1 flex w-[90%] mx-auto py-5">
                <Outlet />
            </section>

            <Footer />
            {/* footer */}
        </main>
    );
};

export default MainLayout;
