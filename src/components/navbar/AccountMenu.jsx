import { Dropdown } from "antd";
import MenuLink from "./MenuLink";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState, logoutAccount } from "../../features/auth/authSlice";
import {setAlertMessage} from "@/core/globalSlice.js";
import {MdAccountCircle} from "react-icons/md";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";
import {AWS_IMAGE_URL} from "@/Constants.js";

const AccountMenu = ({ event }) => {
    const { data : userData } = useGetUserDataQuery();
    const user = userData?.data;
    const nav = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(
            setLoginState({
                isLoggedIn: false,
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
                <button className=" px-3 py-2 duration-200 flex items-center gap-2 font-medium text-base ">
                    {
                        user?.profileImage ?  <img src={ AWS_IMAGE_URL + user?.profileImage} alt={"Profile Image"}  className={`w-7 aspect-square rounded-full border border-darkBgSec/50`} /> : <MdAccountCircle className={`text-2xl text-blue-600 dark:text-darkTer `}/>
                    }
                    {" "}
                    {user?.name}{" "}
                </button>
            </Dropdown>
        </div>
    );
};

export default AccountMenu;
