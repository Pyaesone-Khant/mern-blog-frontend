import {Dropdown, Modal} from "antd";
import MenuLink from "./MenuLink";
import {useDispatch} from "react-redux";
import {logoutAccount, setLoginState} from "@/features/auth/authSlice";
import {MdAccountCircle, MdOutlineBookmarks, MdOutlineLogout} from "react-icons/md";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";
import {useAuth} from "@/hooks/useAuth.js";
import {useState} from "react";
import {CustomBtn} from "@/components/index.js";
import {useResponsive} from "@/hooks/useResponsive.js";
import {RxPencil2, RxPerson} from "react-icons/rx";
import {BsFileText} from "react-icons/bs";
import {BiCategoryAlt} from "react-icons/bi";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {useNavigate} from "react-router-dom";

const AccountMenu = () => {

    const [openModal, setOpenModal] = useState(false)
    const {isMobile} = useResponsive();
    const {saveToken, saveExpiredAt} = useAuth();
    const {currentUser: user} = useCurrentUser();
    const dispatch = useDispatch();
    const nav = useNavigate();

    const slug = useSlugChanger(user?.name)

    const handleLogout = async () => {
        dispatch(
            setLoginState({
                isLoggedIn: false,
                token: null,
            })
        );
        saveToken("");
        saveExpiredAt("")
        dispatch(logoutAccount())
        setOpenModal(false)
        nav("/", {replace: true})
    };

    const isAdmin = user?.email === "admin123@gmail.com";

    const menuItems = [
        isMobile && {
            key: "1",
            label: <MenuLink title={"Write"} path={"/write"}/>,
            icon: <RxPencil2 className={`!text-lg stroke-[0.3px]`}/>
        },
        isMobile && {
            type: 'divider',
        },
        {
            key: "2",
            label: (
                <MenuLink
                    path={`/users/${slug}`}
                    title={"Profile"}
                    state={user?._id}
                />
            ),
            icon: <RxPerson className={`!text-lg stroke-[0.3px]`}/>,
        },
        {
            key: "3",
            label: <MenuLink title={"Library"} path={`/users/${slug}/saved`}/>,
            icon: <MdOutlineBookmarks className={`!text-lg`}/>
        },
        {
            key: "4",
            label: <MenuLink title={"Blogs"} path={`/users/${slug}/blogs`}/>,
            icon: <BsFileText className={`!text-lg stroke-[0.3px]`}/>,
        },
        isAdmin && {
            key: "5",
            label: <MenuLink title={"Categories"} path={`/categories`}/>,
            icon: <BiCategoryAlt className={`!text-lg`}/>,
        },
        {
            key: "6",
            label: <MenuLink title={"Logout"} onClick={() => setOpenModal(true)}/>,
            danger: true,
            icon: <MdOutlineLogout className={`!text-lg`}/>
        },
    ];

    return (
        <div className="font-sans mx-auto">
            <Dropdown
                arrow
                menu={{
                    items: menuItems,
                    selectable: true
                }}
                placement="bottomRight"
                trigger={["click"]}
            >
                <button className=" px-3 py-2 duration-200 flex items-center gap-2 font-medium text-base select-none">
                    {
                        user?.profileImage ? <img src={user?.profileImage} alt={"Profile Image"}
                                                  className={`w-8 aspect-square rounded-full border border-darkBgSec/50`}/> :
                            <MdAccountCircle className={`text-2xl text-blue-600 dark:text-darkTer `}/>
                    }
                </button>
            </Dropdown>

            {/*    logout confirmation modal*/}
            <Modal open={openModal} title={"Are you sure you want to logout?"} footer={null}
                   width={400} onCancel={() => setOpenModal(false)}>
                <div className={`flex justify-end pt-4 gap-2`}>
                    <CustomBtn variant={"outline"} size={"sm"} onClick={() => setOpenModal(false)}
                    >
                        No
                    </CustomBtn>
                    <CustomBtn variant={"danger"} size={"sm"} onClick={handleLogout}>
                        Yes
                    </CustomBtn>
                </div>
            </Modal>
        </div>
    );
};

export default AccountMenu;
