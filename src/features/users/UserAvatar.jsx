import {useState} from "react";
import {Modal, Upload} from "antd";
import {MdAccountCircle, MdImage, MdOutlineAdd} from "react-icons/md";
import {useChangeUserAvatarMutation} from "@/features/users/UserApi.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {PROFILE_IMAGE_URL} from "@/Constants.js";
const UserAvatar = ({user, isUserAuth}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [image, setImage] = useState(null)

    const [changeUserAvatar, {isLoading}] = useChangeUserAvatarMutation();

    const dispatch = useDispatch();

    const handleChange = async (e)  => {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        if(file?.size > maxSize){
            dispatch(setAlertMessage({content: "File size must be less than 5MB", type: "error"}))
        }else{
            setImage(file);
        }
    }

    const onAvatarChange = async () =>{
        try {
            let formData = new FormData();
            formData.append("profileImage", image);
            formData.append("id", user?._id);
            const {data} = await changeUserAvatar(formData);
            if(data?.success){
                dispatch(setAlertMessage({content: data.message, type: "success"}))
                setImage(null);
            }else{
                dispatch(setAlertMessage({content: data.message, type: "error"}))
                setImage(null)
            }
        }catch (error){
            throw new Error(error)
        }
    }

    const onRemove = async () => {
        try {
            const {data} = await changeUserAvatar({ id: user?._id, profileImage: null});
            if(data?.success){
                dispatch(setAlertMessage({content: "Profile picture removed successfully!", type: "success"}))
            }else{
                dispatch(setAlertMessage({content: data.message, type: "error"}))
            }
        }catch (error){
            throw new Error(error)
        }
    }

    return (
        <section className={`p-5 dark:bg-slate-700 bg-white rounded-md flex flex-col gap-3 items-center avatar w-full min-w-max`} >
            <input disabled={isLoading} type="file" id="file" accept={".jpg,.jpeg,.png,.webp"} className={"hidden"} onChange={handleChange} />
            <label htmlFor={isUserAuth ? "file" : ""} className={`w-32 aspect-square flex items-center justify-center rounded-full border dark:border-white border-darkBgSec overflow-hidden ${isUserAuth ? "cursor-pointer" : ""} relative group`}>
                { user?.profileImage ? <img src={PROFILE_IMAGE_URL + user?.profileImage} alt={"Profile Image"} className={`p-1 w-full h-full rounded-full object-cover object-center`} /> : <MdAccountCircle className={`w-full h-full`} /> }
                {
                    isUserAuth && <div className={`absolute bg-black/30 text-white w-full h-full flex group-hover:opacity-100 opacity-0 items-center justify-center duration-200 `}>
                        <MdOutlineAdd className={`text-4xl`} />
                    </div>
                }
            </label>

            {
                image && <p className={`flex items-center gap-3`} > Selected Image: <span className={`text-blue dark:text-darkTer flex items-center gap-1 `}> <MdImage className={`text-xl`} /> {image?.name}</span> </p>
            }

            <div className={`${isUserAuth ? "flex" : "hidden" } items-center justify-center gap-5 w-full`}>
                <button disabled={!image || isLoading} onClick={onAvatarChange} className={`modal-trigger disabled:dOutline disabled:hover:bg-transparent`}> Change Now </button>
                <button disabled={!user?.profileImage} onClick={onRemove} className={`px-4 rounded-md bg-red-600 py-2 text-sm text-white border border-red-600 hover:bg-red-500 duration-200 disabled:dPrimary`} > Remove </button>
            </div>

            <Modal
                open={previewOpen}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt="example" style={{width: '100%'}}/>
            </Modal>
        </section>
    );
};

export default UserAvatar;
