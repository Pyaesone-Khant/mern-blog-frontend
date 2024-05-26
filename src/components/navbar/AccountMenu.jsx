import { useState } from "react";

// icons
import { BiCategoryAlt } from "react-icons/bi";
import { BsFileText } from "react-icons/bs";
import { MdOutlineBookmarks, MdOutlineLogout } from "react-icons/md";
import { RxPencil2, RxPerson } from "react-icons/rx";

// components
import { CustomBtn, CustomModal } from "@/components/index.js";
import { Dropdown } from "antd";
import MenuLink from "./MenuLink";

// hooks
import { useAuth } from "@/hooks/useAuth.js";
import { useCurrentUser } from "@/hooks/useCurrentUser.js";
import { useResponsive } from "@/hooks/useResponsive.js";
import { useSlugChanger } from "@/hooks/useSlugChanger.js";

// reducers
import { logoutAccount, setLoginState } from "@/features/auth/authSlice";

// third-party
import Avvvatars from "avvvatars-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { isMobile } = useResponsive();
    const { saveToken, saveExpiredAt } = useAuth();
    const { currentUser: user } = useCurrentUser();
    const dispatch = useDispatch();
    const nav = useNavigate();

    const slug = useSlugChanger(user?.name);

    const handleLogout = async () => {
        dispatch(
            setLoginState({
                isLoggedIn: false,
                token: null,
            })
        );
        saveToken("");
        saveExpiredAt("");
        dispatch(logoutAccount());
        setOpenModal(false);
        nav("/", { replace: true });
    };

    // check if image is loaded or not
    const onImageLoaded = () => setIsImgLoaded(true);

    const isAdmin = user?.email === "admin123@gmail.com";

    const menuItems = [
        isMobile && {
            key: "1",
            label: <MenuLink title={"Write"} path={"/write"} />,
            icon: <RxPencil2 className={`!text-lg stroke-[0.3px]`} />,
        },
        isMobile && {
            type: "divider",
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
            icon: <RxPerson className={`!text-lg stroke-[0.3px]`} />,
        },
        {
            key: "3",
            label: <MenuLink title={"Library"} path={`/users/${slug}/saved`} />,
            icon: <MdOutlineBookmarks className={`!text-lg`} />,
        },
        {
            key: "4",
            label: <MenuLink title={"Blogs"} path={`/users/${slug}/blogs`} />,
            icon: <BsFileText className={`!text-lg stroke-[0.3px]`} />,
        },
        isAdmin && {
            key: "5",
            label: <MenuLink title={"Categories"} path={`/categories`} />,
            icon: <BiCategoryAlt className={`!text-lg`} />,
        },
        {
            key: "6",
            label: (
                <MenuLink title={"Logout"} onClick={() => setOpenModal(true)} />
            ),
            danger: true,
            icon: <MdOutlineLogout className={`!text-lg`} />,
        },
    ];

    return (
        <div className="font-sans mx-auto">
            <Dropdown
                arrow
                menu={{
                    items: menuItems,
                    selectable: true,
                }}
                placement="bottomRight"
                trigger={["click"]}
            >
                <button className="duration-200 flex items-center gap-2 font-medium text-base select-none rounded-full border border-darkBgSec/70">
                    {user?.profileImage && isImgLoaded ? (
                        <img
                            src={user?.profileImage}
                            alt={"Profile Image"}
                            className={`w-8 aspect-square rounded-full `}
                            onLoad={onImageLoaded}
                        />
                    ) : (
                        <Avvvatars value={user?.name} size={32} />
                    )}
                </button>
            </Dropdown>

            {/*    logout confirmation modal*/}
            <CustomModal
                isOpen={openModal}
                title={"Are you sure you want to logout?"}
                closeModal={() => setOpenModal(false)}
            >
                <div className={`flex justify-end pt-4 gap-2`}>
                    <CustomBtn
                        variant={"cancel"}
                        size={"sm"}
                        onClick={() => setOpenModal(false)}
                    >
                        No
                    </CustomBtn>
                    <CustomBtn
                        variant={"danger"}
                        size={"sm"}
                        onClick={handleLogout}
                    >
                        Yes
                    </CustomBtn>
                </div>
            </CustomModal>
        </div>
    );
};

export default AccountMenu;
