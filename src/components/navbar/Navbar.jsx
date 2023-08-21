import { Link } from "react-router-dom";
import CNavlink from "./CNavlink";
import AccountMenu from "./AccountMenu";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { token, isLoggedIn, user } = useSelector((state) => state.auth);
    return (
        <header className="py-5 sticky top-0 shadow-md border-b z-10 backdrop-blur-md bg-white">
            <nav className="w-[90%] mx-auto flex items-center justify-between flex-col md:flex-row">
                <div className="w-full md:w-auto flex items-center justify-between">
                    <h1
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-bold"
                    >
                        <Link to={"/"}>LOGO</Link>
                    </h1>
                    <button
                        onClick={handleMenu}
                        className="outline-none w-fit p-2 px-3 rounded-md text-black md:hidden text-3xl active:bg-none"
                    >
                        {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
                    </button>
                </div>
                <nav
                    className={`w-full md:w-auto top-[66px] md:top-0 bg-white fixed md:relative transform pb-5 md:pb-0 shadow-md md:shadow-none border-b md:border-none md:translate-y-0 md:opacity-100 ${
                        isOpen
                            ? "  opacity-100 translate-y-0  "
                            : " opacity-0 -translate-y-[100vh]"
                    } duration-500 overflow-hidden -z-[1] md:z-auto`}
                >
                    {isLoggedIn ? (
                        <ul className="nav-ul">
                            <CNavlink
                                event={() => setIsOpen(false)}
                                path={"/"}
                                title={"home"}
                            />
                            <CNavlink
                                event={() => setIsOpen(false)}
                                path={"/create_blog"}
                                title={"create blog"}
                            />
                            <AccountMenu
                                event={() => setIsOpen(false)}
                                user={user}
                                token={token}
                            />
                        </ul>
                    ) : (
                        <ul className="nav-ul">
                            <CNavlink
                                event={() => setIsOpen(false)}
                                path={"/register"}
                                title={"register"}
                            />
                            <CNavlink
                                event={() => setIsOpen(false)}
                                path={"/login"}
                                title={"login"}
                            />
                        </ul>
                    )}
                </nav>
            </nav>
        </header>
    );
};

export default Navbar;
