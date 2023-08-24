import { Dropdown, notification } from "antd";
import MenuLink from "./MenuLink";
import { useLogoutAccountMutation } from "@/features/auth/authApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../features/auth/authSlice";

const AccountMenu = ({ user, token, event }) => {
    const [logoutAccount] = useLogoutAccountMutation();
    const nav = useNavigate();

    const dispatch = useDispatch();

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (desc) => {
        api.error({
            description: (
                <p className="font-sans font-medium tracking-wider"> {desc}</p>
            ),
            duration: 2,
        });
    };

    const handleLogout = async () => {
        event();
        try {
            const { data } = await logoutAccount(token);
            if (data?.success) {
                Cookies.remove("token");
                Cookies.remove("user");
                dispatch(
                    setLoginState({
                        isLoggedIn: false,
                        user: null,
                        token: null,
                    })
                );
                nav("/", { state: data?.message });
            } else {
                openNotification(data?.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const menuItems = [
        {
            key: 1,
            label: (
                <MenuLink event={event} path={"profile"} title={"Profile"} />
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
            {contextHolder}
            <Dropdown
                className="min-w-[130px]"
                arrow
                menu={{
                    items: menuItems,
                }}
                placement="bottom"
                trigger={["click"]}
            >
                <button className=" min-w-max px-5 w-fit py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 duration-200">
                    {" "}
                    {user?.name}{" "}
                </button>
            </Dropdown>
        </div>
    );
};

export default AccountMenu;
