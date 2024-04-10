import axios from "axios";

const CLOUD_NAME = "dmvh4zrr4";
const PRESET_NAME = "demo-upload";
const FOLDER_NAME = "webgiay123";

const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


const upLoadFiles = async (values) => {
    const urls = [];
    const formData = new FormData();

    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of values) {
        formData.append("file", file);
        // formData.append("public_id", mau); // Đặt tên tệp tin tùy chỉnh
        // console.log('file ',file);
        const response = await axios.post(api, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        urls.push(response.data.secure_url);
    }
    return urls;
};

export { upLoadFiles };
