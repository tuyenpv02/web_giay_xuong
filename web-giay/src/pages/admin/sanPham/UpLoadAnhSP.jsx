import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { Upload, Flex, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const UpLoadAnhSP = ({ lstCTSP }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [anh, setAnh] = useState([]);

    useEffect(() => {
        if (fileList.length < 1) {
            lstCTSP?.map((o) => {
                o.anh = null;
                return o;
            });
        } else {
            lstCTSP?.map((o) => {
                o.anh = [...anh];
                return o;
            });
        }
    }, [fileList]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div>Chọn ảnh</div>
        </button>
    );

    const logLst = () => {
        console.log(lstCTSP);
    };
    return (
        <Flex style={{ minHeight: "120px" }}>
            {/* <Button onClick={() => logLst()}>Log</Button> */}
            <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                data={(da) => {
                    setAnh([da]);
                }}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: "none",
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </Flex>
    );
};

export default UpLoadAnhSP;
