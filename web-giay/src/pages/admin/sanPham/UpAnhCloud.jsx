import { Button, Flex, Typography, Modal, Row, Col, Avatar, Space, Upload, Popconfirm } from "antd";
import { useState } from "react";
import { upLoadFiles } from "../../../utils/UpLoadAnhCLoudinary";

const UpAnhCloud = ({ mauSac, mauChon, setMauChon }) => {
    const [ds, setDs] = useState([]);
    const [fileList, setFileList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const luuAnhCloud = (e) => {
        const values = [e]
        upLoadFiles(values);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Chọn ảnh
            </Button>
            {/*  */}
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                title={<Typography.Title level={2}>Ảnh</Typography.Title>}
                centered
                footer={false}
            >
                <Flex vertical gap={"large"}>
                    <Flex justify="end">
                        <Button
                            onClick={() => {
                                console.log(fileList);
                            }}
                        >
                            Thêm ảnh
                        </Button>
                        {/*  */}
                        <Upload
                            fileList={fileList}
                            data={(e) => luuAnhCloud(e)}
                            onChange={handleChange}
                            showUploadList={false}
                        >
                            <Button>Click to Upload</Button>
                        </Upload>
                    </Flex>
                    <Row gutter={2}>
                        <Col span={8}>
                            <Avatar />
                        </Col>
                        <Col span={8}>
                            <Avatar />
                        </Col>
                        <Col span={8}>
                            <Avatar />
                        </Col>
                    </Row>

                    <Flex justify="end" gap={"small"}>
                        <Button type="primary">Hoàn tất</Button>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};

export default UpAnhCloud;
