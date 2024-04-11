import { Typography } from "antd";
import { formatTrangThaiLSHD } from "../../../utils/formatTrangThaiHD";
import { Modal } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { Button } from "antd";

function ModalLichSuHD({ lichSuHoaDon }) {
    // modal
    // Open Modal lịch sử hóa đơn
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalLSHD = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columnsLSHD = [
        {
            title: "#",
            dataIndex: "trangThai",
            width: 20,
            render: (text, record, index) => (
                <>
                    <Typography.Text size={"large"}>{index + 1}</Typography.Text>
                </>
            ),
        },
        {
            title: "trạng thái",
            dataIndex: "trangThai",
            render: (text) => (
                <Typography.Text size={"large"} strong>
                    {formatTrangThaiLSHD(text)}
                </Typography.Text>
            ),
        },
        {
            title: "ngày tạo",
            dataIndex: "ngayTao",
            render: (text, record) => <Typography.Text size={"large"}>{text}</Typography.Text>,
        },
        {
            title: "nhân viên",
            dataIndex: "nguoiTao",
            width: 100,
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: "ghi chú",
            dataIndex: "ghiChu",
            width: 400,
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
        },
    ];
    return (
        <div>
            <Button
                onClick={() => {
                    showModalLSHD();
                }}
                type="primary"
            >
                Chi tiết
            </Button>

            <Modal width={1000} open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Table
                    pagination={{
                        pageSize: 5,
                    }}
                    columns={columnsLSHD}
                    dataSource={lichSuHoaDon}
                />
            </Modal>
        </div>
    );
}

export default ModalLichSuHD;
