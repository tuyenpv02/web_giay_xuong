import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Flex,
    Input,
    InputNumber,
    Modal,
    Row,
    Space,
    Steps,
    Table,
    Tag,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HoaDonService from "../../../services/HoaDonService";
import { formatTrangThaiHD } from "../../../utils/formatTrangThaiHD";
import HoaDonChiTietService from "../../../services/HoaDonChiTietService";
import { formatPrice } from "../../../utils/formatNumber";
import LichSuHoaDonService from "./../../../services/LichSuHoaDonService";
import PhuongThucThanhToanService from "./../../../services/PhuongThucThanhToanService";
import StepHoaDonChiTiet from "./StepHoaDonChiTiet";
import LichSuThanhToanHDCT from "./LichSuThanhToanHDCT";
import getDateNow from "../../../utils/GetDateNow";

const HoaDonChiTietPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    // const [trangThaiHD, setTrangThaiHD] = useState();
    const [hoaDon, setHoaDon] = useState();
    const [hoaDonChiTiet, setHoaDonChiTiet] = useState([]);
    const [lichSuHoaDon, setLichSuHoaDon] = useState([]);
    const [lichSuHD, setLichSuHD] = useState({
        hoaDon: { id: hoaDon?.id },
        ghiChu: "",
        trangThai: null,
        ngayTao: getDateNow(),
        nguoiTao: "system",
    });
    const [lichSuThanhToan, setLichSuThanhToan] = useState([]);

    // modal
    // Open Modal lịch sử hóa đơn
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalAdd = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Open Modal xác thực, ghi chú
    const [modalXacThuc, setModalXacThuc] = useState(false);
    const showModalXacThuc = (trangThaiXacThuc) => {
        setLichSuHD({ ...lichSuHD, hoaDon: { id: hoaDon?.id }, trangThai: trangThaiXacThuc });
        setModalXacThuc(true);
    };
    const handleOKXacThuc = () => {
        let XacThucHD = async () => {
            let resHD = await HoaDonService.update(hoaDon.id, hoaDon, lichSuHD.trangThai);
            // setHoaDon({ ...resHD });
            let resLSHD = await LichSuHoaDonService.add(lichSuHD);

            getHDById();
            getLSHDById();
            getHDCTById();
        };
        XacThucHD();
        handleCancelXacThuc();
    };
    const handleCancelXacThuc = () => {
        setLichSuHD({ ...lichSuHD, ghiChu: "" });
        setModalXacThuc(false);
    };
    //

    // hoa don
    let getHDById = async () => {
        let res = await HoaDonService.getById(params.id);
        setHoaDon({ ...res });
    };
    useEffect(() => {
        getHDById();
    }, []);

    // hoa don chi tiet
    let getHDCTById = async () => {
        let res = await HoaDonChiTietService.getAllByHD(params.id);
        setHoaDonChiTiet([...res]);
    };
    useEffect(() => {
        getHDCTById();
    }, []);

    // lich su hoa don
    let getLSHDById = async () => {
        let res = await LichSuHoaDonService.getAllByHD(params.id);
        setLichSuHoaDon([...res]);
    };
    useEffect(() => {
        getLSHDById();
    }, []);

    // lich su thanh toan
    useEffect(() => {
        let getLSTTById = async () => {
            let res = await PhuongThucThanhToanService.getAllByHD(params.id);
            setLichSuThanhToan([...res]);
        };
        getLSTTById();
    }, []);

    const columnsSanPham = [
        {
            title: "#",
            dataIndex: "chiTietSanPham",
            key: "id",
            render: (text, record, index) => (
                <>
                    <Typography.Text size={"large"}>{index + 1}</Typography.Text>
                </>
            ),
        },
        {
            title: "sản phẩm",
            dataIndex: "chiTietSanPham",
            key: "id",
            render: (text, record) => (
                <>
                    <Flex vertical>
                        <Typography.Text strong>{record.chiTietSanPham.ten}</Typography.Text>
                        <Typography.Text type="danger">
                            {formatPrice(record.donGia)}
                        </Typography.Text>
                    </Flex>
                </>
            ),
        },
        {
            title: "số lượng",
            dataIndex: "soLuong",
            key: "id",

            render: (text, record) => <InputNumber value={record.soLuong} />,
        },
        {
            title: "đơn giá",
            dataIndex: "donGia",
            key: "id",
            render: (text, record) => (
                <>
                    <Typography.Text strong>
                        {formatPrice(record.soLuong * record.donGia)}
                    </Typography.Text>
                </>
            ),
        },
        {
            title: "Thao tác",
            key: "id",
            render: (text, record) => (
                <>
                    <Button type="primary">Xóa</Button>
                </>
            ),
        },
    ];

    const columnsLSHD = [
        {
            title: "#",
            dataIndex: "trangThai",
            key: "id",
            render: (text, record, index) => (
                <>
                    <Typography.Text size={"large"}>{index + 1}</Typography.Text>
                </>
            ),
        },
        {
            title: "trạng thái",
            dataIndex: "trangThai",
            key: "id",
            render: (text) => (
                <Typography.Text size={"large"}>{formatTrangThaiHD(text)}</Typography.Text>
            ),
        },
        {
            title: "ngày tạo",
            dataIndex: "ngayTao",
            key: "id",
            render: (text, record) => <Typography.Text size={"large"}>{text}</Typography.Text>,
        },
        {
            title: "nhân viên",
            dataIndex: "nguoiTao",
            key: "id",
            render: (text, record) => <Typography.Text strong>{text}</Typography.Text>,
        },
        {
            title: "ghi chú",
            dataIndex: "ghiChu",
            key: "id",
            render: (text, record) => <Typography.Text strong>{text}</Typography.Text>,
        },
    ];
    return (
        <>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: "flex",
                }}
            >
                <Card size="small">
                    <Row>
                        <Col span={24}>
                            <StepHoaDonChiTiet lichSuHoaDon={lichSuHoaDon} />
                            <br />
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <Flex align="center" gap={5}>
                                        {(hoaDon?.trangThai == 1 || hoaDon?.trangThai == 2) && (
                                            <Button
                                                onClick={() => {
                                                    showModalXacThuc(3);
                                                }}
                                                type="primary"
                                            >
                                                Xác nhận
                                            </Button>
                                        )}
                                        {hoaDon?.trangThai == 3 && (
                                            <Button
                                                onClick={() => {
                                                    showModalXacThuc(4);
                                                }}
                                                type="primary"
                                            >
                                                Giao hàng
                                            </Button>
                                        )}
                                        {hoaDon?.trangThai == 4 && (
                                            <Button
                                                onClick={() => {
                                                    showModalXacThuc(5);
                                                }}
                                                type="primary"
                                            >
                                                Thanh toán
                                            </Button>
                                        )}
                                        {hoaDon?.trangThai == 5 && (
                                            <Button
                                                onClick={() => {
                                                    showModalXacThuc(6);
                                                }}
                                                type="primary"
                                            >
                                                Hoàn thành
                                            </Button>
                                        )}

                                        {(hoaDon?.trangThai == 1 ||
                                            hoaDon?.trangThai == 2 ||
                                            hoaDon?.trangThai == 3) && (
                                            <Button type="primary" danger>
                                                Hủy đơn
                                            </Button>
                                        )}
                                    </Flex>
                                </Col>
                                <Col span={12}>
                                    <Flex justify="end" align="center" gap={5}>
                                        <Button type="primary">In hóa đơn</Button>
                                        <Button
                                            onClick={() => {
                                                showModalAdd();
                                            }}
                                            type="primary"
                                        >
                                            Chi tiết
                                        </Button>
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                {/* thông tin đơn hàng */}
                <Card
                    title={
                        <Typography.Title level={4}>
                            Thông tin đơn hàng - {hoaDon?.ma}
                        </Typography.Title>
                    }
                    size="small"
                >
                    <Row gutter={[10, 10]}>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong htmlFor="">
                                        Trạng thái:
                                    </Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Tag color="blue">{formatTrangThaiHD(hoaDon?.trangThai)} </Tag>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Tên khách hàng:</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text>
                                        {hoaDon?.hoTen ? hoaDon?.hoTen : "Khách lẻ"}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Loại:</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Tag color="purple">
                                        {hoaDon?.loaiHoaDon ? "tại quầy" : "trực tuyến"}
                                    </Tag>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Số điện thoại:</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text>{hoaDon?.sdt} </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Tổng tiền:</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text>
                                        {formatPrice(hoaDon?.tongTien)}{" "}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Phí vận chuyển:</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text>
                                        {formatPrice(hoaDon?.tienShip)}{" "}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Địa chỉ:</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text>
                                        {hoaDon?.diaChi ? hoaDon?.diaChi : "Không có"}{" "}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text strong>Ghi chú:</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Typography.Text>
                                        {hoaDon?.ghiChu ? hoaDon?.ghiChu : "Không có"}{" "}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                {/*  */}
                <Card
                    title={<Typography.Title level={4}>Lịch sử thanh toán</Typography.Title>}
                    size="small"
                >
                    <LichSuThanhToanHDCT lichSuThanhToan={lichSuThanhToan} />
                </Card>
                <Card title={<Typography.Title level={4}>Sản phẩm</Typography.Title>} size="small">
                    <Table
                        dataSource={hoaDonChiTiet}
                        columns={columnsSanPham}
                        key={"id"}
                        pagination={{
                            pageSize: 3,
                        }}
                    />
                </Card>
            </Space>

            {/* //Modal  */}
            {/* modal lshd */}
            <Modal width={1000} open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Table
                    pagination={{ pageSize: 10 }}
                    columns={columnsLSHD}
                    dataSource={lichSuHoaDon}
                />
            </Modal>

            {/* modal xác thực hóa đơn */}
            <Modal
                title="Xác nhận đơn hàng"
                open={modalXacThuc}
                onOk={handleOKXacThuc}
                onCancel={handleCancelXacThuc}
            >
                <Input.TextArea
                    value={lichSuHD?.ghiChu}
                    onChange={(e) =>
                        setLichSuHD({
                            ...lichSuHD,
                            ghiChu: e.target.value,
                        })
                    }
                    placeholder="mô tả"
                />
            </Modal>
            {/* // End modal */}
        </>
    );
};

export default HoaDonChiTietPage;
