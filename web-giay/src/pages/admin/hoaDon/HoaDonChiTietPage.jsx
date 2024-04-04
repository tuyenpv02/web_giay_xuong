import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Flex,
    Form,
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
import { toast } from "react-toastify";
import ModalSuaThongTin from "./ModalSuaThongTin";
import ThongTinHDCT from "./ThongTinHDCT";

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

    const taoLSHD = async () => {
        let resLSHD = await LichSuHoaDonService.add(lichSuHD);
    };

    // modal
    // Open Modal lịch sử hóa đơn
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalAdd = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Open Modal xác thực trạng thái hóa đơn, ghi chú
    const [modalXacThuc, setModalXacThuc] = useState(false);
    const showModalXacThuc = (trangThaiXacThuc) => {
        setLichSuHD({
            ...lichSuHD,
            hoaDon: { id: hoaDon?.id },
            hanhDong: 1,
            trangThai: trangThaiXacThuc,
            nguoiTao: "anph779",
        });
        setModalXacThuc(true);
    };

    const handleOKXacThuc = () => {
        let XacThucHD = async () => {
            let resHD = await HoaDonService.update(hoaDon.id, hoaDon, lichSuHD.trangThai);
            await taoLSHD();

            getHDById();
            getLSHDById();
            getHDCTById();
        };
        XacThucHD();
        handleCancelXacThuc();
        toast.success("Xác nhận thành công");
    };
    const handleCancelXacThuc = () => {
        setLichSuHD({ ...lichSuHD, ghiChu: "" });
        setModalXacThuc(false);
    };

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
            // dataIndex: "chiTietSanPham",
            render: (text, record, index) => (
                <>
                    <Typography.Text size={"large"}>{index + 1}</Typography.Text>
                </>
            ),
        },
        {
            title: "sản phẩm",
            dataIndex: "chiTietSanPham",
            render: (text, record) => (
                <>
                    <Flex vertical>
                        <Typography.Text strong>
                            {record.chiTietSanPham.ma} - {record.chiTietSanPham.ten}
                        </Typography.Text>
                        <Typography.Text type="danger">
                            {formatPrice(record.donGia)}
                        </Typography.Text>
                        <Typography.Text>
                            màu sắc: {record.chiTietSanPham.mauSac.ten}
                        </Typography.Text>
                        <Typography.Text>
                            kích cỡ: {record.chiTietSanPham.kichCo.ten}
                        </Typography.Text>
                    </Flex>
                </>
            ),
        },
        {
            title: "số lượng",
            dataIndex: "soLuong",
            render: (text, record) => <InputNumber value={record.soLuong} />,
        },
        {
            title: "đơn giá",
            dataIndex: "donGia",
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
                    {formatTrangThaiHD(text)}
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
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: "ghi chú",
            dataIndex: "ghiChu",
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
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
                                                Đã giao hàng
                                            </Button>
                                        )}
                                        {hoaDon?.trangThai == 5 && (
                                            <Button
                                                onClick={() => {
                                                    showModalXacThuc(6);
                                                }}
                                                type="primary"
                                            >
                                                Thanh toán
                                            </Button>
                                        )}
                                        {hoaDon?.trangThai == 6 && (
                                            <Button
                                                onClick={() => {
                                                    showModalXacThuc(7);
                                                }}
                                                type="primary"
                                            >
                                                Hoàn thành
                                            </Button>
                                        )}

                                        {(hoaDon?.trangThai == 1 ||
                                            hoaDon?.trangThai == 2 ||
                                            hoaDon?.trangThai == 3) && (
                                            <Button
                                                onClick={() => {
                                                    showModalXacThuc(0);
                                                }}
                                                type="primary"
                                                danger
                                            >
                                                Hủy đơn
                                            </Button>
                                        )}
                                    </Flex>
                                </Col>
                                <Col span={12}>
                                    <Flex justify="end" align="center" gap={5}>
                                        {/* <Button type="primary">In hóa đơn</Button> */}
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
                    extra={
                        <ModalSuaThongTin
                            diaChi={hoaDon?.diaChi}
                            hoTen={hoaDon?.hoTen}
                            sdt={hoaDon?.sdt}
                            hoaDon={hoaDon}
                        />
                    }
                    size="small"
                >
                   <ThongTinHDCT hoaDon={hoaDon} />
                </Card>

                {/* ----------------------------------------------------------------- */}
                <Card
                    title={<Typography.Title level={4}>Lịch sử thanh toán</Typography.Title>}
                    extra={<Button type="primary">Xác nhận thanh toán</Button>}
                    size="small"
                >
                    <LichSuThanhToanHDCT lichSuThanhToan={lichSuThanhToan} />
                </Card>

                {/* ----------------------------------------------------------------- */}
                <Card
                    title={<Typography.Title level={4}>Sản phẩm</Typography.Title>}
                    extra={<Button type="primary">Thêm sản phẩm</Button>}
                    size="small"
                >
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

            {/* ----------------------------------------------------------------- */}
            {/* //Modal  */}
            {/* modal lshd */}
            <Modal width={1000} open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Table pagination={false} columns={columnsLSHD} dataSource={lichSuHoaDon} />
            </Modal>

            {/* modal xác thực hóa đơn */}
            <Modal
                title="Xác nhận đơn hàng"
                open={modalXacThuc}
                // onOk={handleOKXacThuc}
                onCancel={handleCancelXacThuc}
                footer={false}
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
                <div className="d-flex justify-content-end mt-2 ">
                    <Button
                        key={"submit"}
                        type="primary"
                        htmlType="submit"
                        disabled={lichSuHD?.ghiChu.trim() ? false : true}
                        onClick={handleOKXacThuc}
                    >
                        Xác thực
                    </Button>
                </div>
            </Modal>
            {/* // End modal */}
        </>
    );
};

export default HoaDonChiTietPage;
