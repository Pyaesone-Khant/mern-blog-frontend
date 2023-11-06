import { Dropdown } from "antd";
import MenuLink from "./MenuLink";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState, logoutAccount } from "../../features/auth/authSlice";
import {setAlertMessage} from "@/core/globalSlice.js";

const AccountMenu = ({ user, event }) => {
    const nav = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(
            setLoginState({
                isLoggedIn: false,
                user: null,
                token: null,
            })
        );
        dispatch(logoutAccount())
        dispatch(setAlertMessage({type: "success", content : "Logout successful!"}))
        event();
        nav("/");

    };

    const menuItems = [
        {
            key: 1,
            label: (
                <MenuLink
                    event={event}
                    path={`/profile/${user?._id}`}
                    title={"Profile"}
                />
            ),
        },
        {
            key: 2,
            label: <MenuLink title={"Logout"} event={handleLogout} />,
            danger: true,
        },
    ];

    return (
        <div className="font-sans mx-auto">
            <Dropdown
                arrow
                menu={{
                    items: menuItems,
                }}
                placement="bottom"
                trigger={["click"]}
            >
                <button className=" min-w-[120px] w-full py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 duration-200">
                    {" "}
                    {user?.name}{" "}
                </button>
            </Dropdown>
        </div>
    );
};

export default AccountMenu;
