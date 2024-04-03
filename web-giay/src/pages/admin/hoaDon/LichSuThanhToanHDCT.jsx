import { Table, Tag, Typography } from "antd";
import { formatPrice } from "../../../utils/formatNumber";

const LichSuThanhToanHDCT = ({ lichSuThanhToan }) => {
    const columnLichSuThanhToan = [
        {
            title: "loại thanh toán",
            dataIndex: "loaiThanhToan",
            key: "ten",
            render: (text, record) => <Tag color="green">{text ? "tiền mặt" : "chuyển khoản"}</Tag>,
        },
        {
            title: "tiền",
            dataIndex: "tongTien",
            key: "ten",
            render: (text, record) => <Typography.Text>{formatPrice(text)}</Typography.Text>,
        },
        {
            title: "ngày tạo",
            dataIndex: "ngayTao",
            key: "ten",
            render: (text, record) => <a>{text}</a>,
        },
        {
            title: "ghi chú",
            dataIndex: "ghiChu",
            key: "ten",
            render: (text, record) => <a>{text}</a>,
        },
    ];
    return (
        <>
            <Table
                columns={columnLichSuThanhToan}
                dataSource={lichSuThanhToan}
                key={"id"}
                pagination={false}
            />
        </>
    );
};

export default LichSuThanhToanHDCT;
