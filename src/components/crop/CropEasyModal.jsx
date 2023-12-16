import {Modal} from "antd";
import Cropper from "react-easy-crop";
import {useState} from "react";
import {setAlertMessage} from "@/core/globalSlice.js";
import {useDispatch} from "react-redux";
import getCroppedImg from "@/components/crop/cropImage.js";

const CropEasyModal = () => {

    const [image, setImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const dispatch = useDispatch();

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

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onCanceled = () => {
        setImage(null);
        setOpenModal(false);
        setZoom(1);
    }

    const handleCropImage = async () => {
        try {
            const croppedImage = await getCroppedImg(image.url, croppedAreaPixels);

            const file = new File([croppedImage], image.file.name, {type: image.file.type});
            console.log(file);
            setImage(null);
            setOpenModal(false);
            setZoom(1);
        }catch (error){
            throw new Error(error)
        }
    }

    return (
        <section>
            <input type={"file"} onChange={handleFileChange} accept={".jpg,.jpeg,.png,.webp"} />
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
                    <button className={`btn bg-cBlue`} onClick={handleCropImage} >
                        Crop & Upload
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default CropEasyModal;
