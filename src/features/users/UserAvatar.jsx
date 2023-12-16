import {useState} from "react";
import {Modal} from "antd";
import {MdAccountCircle, MdOutlineAdd} from "react-icons/md";
import {useChangeUserAvatarMutation} from "@/features/users/UserApi.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {AWS_IMAGE_URL} from "@/Constants.js";
import {Spinner} from "@/components/index.js";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/components/crop/cropImage.js";

const UserAvatar = ({user, isUserAuth}) => {
    const [changeUserAvatar, {isLoading}] = useChangeUserAvatarMutation();
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


    // getting file
    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        if(file?.size > maxSize){
            dispatch(setAlertMessage({content: "File size must be less than 5MB", type: "error"}))
        }else{
            setImage({url: URL.createObjectURL(file), file});
            setOpenModal(true);
        }
    }

    // getting cropped area
    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    // canceling crop modal
    const onCanceled = () => {
        setImage(null);
        setOpenModal(false);
        setZoom(1);
    }

    // uploading cropped image
    const onAvatarChange = async () =>{
        try {
            const croppedImage = await getCroppedImg(image.url, croppedAreaPixels);
            const profileImage = new File([croppedImage.file], image.file.name, {type: image.file.type});
            let formData = new FormData();
            formData.append("profileImage", profileImage);
            formData.append("id", user?._id);
            setOpenModal(false);
            const {data} = await changeUserAvatar(formData);
            if(data?.success){
                dispatch(setAlertMessage({content: data.message, type: "success"}))
                setImage(null);
                setZoom(1);
            }else{
                dispatch(setAlertMessage({content: data.message, type: "error"}))
            }
        }catch (error){
            throw new Error(error)
        }
    }

    // removing profile image
    const onRemove = async () => {
        try {
            const {data} = await changeUserAvatar({ id: user?._id, profileImage: null});
            if(data?.success){
                dispatch(setAlertMessage({content: "Your profile picture has been removed successfully!", type: "success"}))
            }else{
                dispatch(setAlertMessage({content: data.message, type: "error"}))
            }
        }catch (error){
            throw new Error(error)
        }
    }

    return (
        <section className={`p-5 dark:bg-slate-700 bg-white rounded-md flex flex-col gap-3 items-center avatar w-full min-w-max`} >

            {/* profile picture */}
            <input disabled={isLoading} type="file" id="file" accept={".jpg,.jpeg,.png,.webp"} className={"hidden"} onChange={handleFileChange} />
            <label htmlFor={isUserAuth ? "file" : ""} className={`w-32 aspect-square flex items-center justify-center rounded-full border dark:border-white border-darkBgSec overflow-hidden ${isUserAuth ? "cursor-pointer" : ""} relative group`}>
                {
                    user?.profileImage ? <img src={AWS_IMAGE_URL + user?.profileImage} alt={"Profile Image"} className={`p-1 w-full h-full rounded-full object-cover object-center`} /> : <MdAccountCircle className={`w-full h-full`} />
                }
                {
                    isUserAuth && !isLoading && <div className={`absolute bg-black/30 text-white w-full h-full flex group-hover:opacity-100 opacity-0 items-center justify-center duration-200 `}>
                        <MdOutlineAdd className={`text-4xl`} />
                    </div>
                }
            </label>

            {/* remove image button */}
            <button disabled={!user?.profileImage} onClick={onRemove} className={` ${isUserAuth ? "flex" : "hidden"} delete-btn w-fit disabled:dPrimary`} > Remove Profile </button>

            {/* crop image modal */}
            <Modal open={openModal} footer={null} centered={true} onCancel={() => setOpenModal(false)} >
                <h2 className={`font-semibold text-darkBgSec mb-2 `} >Crop Image</h2>
                <div className={`relative w-full aspect-square rounded-md `} >
                    <Cropper image={image?.url} crop={crop} onCropChange={setCrop} zoom={zoom} onZoomChange={setZoom} maxZoom={zoom * 3} aspect={1} onCropComplete={handleCropComplete} />
                </div>
                <div className={`my-5`} >
                    <label htmlFor={"zoomRange"} className={`block font-medium`} > Zoom : {`${Math.round(zoom * 100)}%`} </label>
                    <input type={"range"} id={"roomRange"} step={0.01} onChange={(e) => setZoom(e.target.value)} min={1} max={3} value={zoom} className={`w-full h-1 bg-gray-500 rounded-md appearance-none cursor-pointer range-sm `} />
                </div>
                <div className={`flex items-center gap-5  `} >
                    <button className={` btn delete-btn `} onClick={onCanceled} >
                        Cancel
                    </button>
                    <button className={`btn bg-cBlue`} onClick={onAvatarChange} >
                        Crop & Upload
                    </button>
                </div>
            </Modal>


            {/* loader while image is uploading */}
            {
                isLoading && <div className={` w-full h-full z-20 bg-black/40 fixed top-0 left-0 flex items-center justify-center `} >
                    <Spinner/>
                </div>
            }
        </section>
    );
};

export default UserAvatar;
