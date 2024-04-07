import { useEffect, useState } from "react";
import { Modal, Button, Row, Radio, Typography, Input, Form, Flex } from "antd";
import { formatPrice } from "../../../utils/formatNumber";
import { toast } from "react-toastify";
import PhuongThucThanhToanService from "./../../../services/PhuongThucThanhToanService";
import getDateNow from "../../../utils/GetDateNow";
import LichSuHoaDonService from "../../../services/LichSuHoaDonService";

const ModalXacNhanThanhToan = ({ hoaDon, isLoad, setIsLoad }) => {
    const [lichSuHD, setLichSuHD] = useState({
        hoaDon: { id: hoaDon?.id },
        ghiChu: "Xác nhận thanh toán",
        trangThai: 10,
        hanhDong: 2,
        ngayTao: getDateNow(),
        nguoiTao: "anph779",
    });

    const [tongTien, setTongTien] = useState();
    const [ghiChu, setGhiChu] = useState("");
    const [loaiThanhToan, setLoaiThanhToan] = useState(1);
    const [checkThanhToan, setCheckThanhToan] = useState(false);
    const [checkTien, setCheckTien] = useState(0);

    // modal só lượng
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        let tienThieu = Number(hoaDon?.tongTien) - Number(tongTien);
        if (Number(tongTien) >= Number(hoaDon?.tongTien)) {
            setCheckTien(0);
            setCheckThanhToan(true);
        } else {
            setCheckThanhToan(false);
            setCheckTien(tienThieu);
        }
    }, [tongTien]);

    const submitThanhToan = () => {
        if (!checkThanhToan) {
            toast.warning("Chưa đủ tiền");
            return;
        }
        const data = {
            hoaDon: { id: hoaDon?.id },
            loaiThanhToan: loaiThanhToan,
            tongTien: Number(hoaDon?.tongTien),
            ghiChu: ghiChu,
            trangThai: loaiThanhToan,
            ngayTao: getDateNow(),
            nguoiTao: "anph779",
        };
        const lsHD = {
            ...lichSuHD,
            hoaDon: { id: hoaDon?.id },
            ghiChu: lichSuHD.ghiChu + " " + tongTien,
        };
        PhuongThucThanhToanService.add(data)
            .then((res) => {
                LichSuHoaDonService.add(lsHD);
                setIsLoad(!isLoad);
                toast.success("thành công");
                handleCancel();
            })
            .catch((err) => toast.error("thất bại ", err));

        setTongTien("");
        setGhiChu("");
    };

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Xác nhận thanh toán
            </Button>
            {/*  */}
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                title={<Typography.Title level={2}>Thanh toán</Typography.Title>}
                centered
                footer={false}
            >
                <Flex justify="space-between">
                    <Typography.Title level={5}>Tổng tiền hàng:</Typography.Title>
                    <Typography.Text type="danger">{formatPrice(hoaDon?.tongTien)}</Typography.Text>
                </Flex>

                <Flex vertical gap={"large"}>
                    <Flex vertical>
                        <Typography.Text>Tiền khách đưa:</Typography.Text>
                        <Input
                            name="tongTien"
                            value={tongTien}
                            onChange={(e) => setTongTien(e.target.value)}
                            suffix="VND"
                        />
                    </Flex>
                    <Flex vertical>
                        <Typography.Text>Ghi chú:</Typography.Text>
                        <Input.TextArea
                            value={ghiChu}
                            onChange={(e) => setGhiChu(e.target.value)}
                            name="ghiChu"
                        />
                    </Flex>

                    <Radio.Group name="loaiThanhToan" defaultValue={1} size="large">
                        <Radio.Button value={1}>Tiền mặt</Radio.Button>
                        <Radio.Button disabled value={2}>
                            Chuyển khoản
                        </Radio.Button>
                    </Radio.Group>

                    <Flex justify="space-between">
                        <Typography.Title level={5}>Tiền thiếu:</Typography.Title>
                        <Typography.Text type="danger">
                            {formatPrice(checkTien ? checkTien : 0)}
                        </Typography.Text>
                    </Flex>

                    <Flex justify="end" gap={"small"}>
                        <Button type="primary" onClick={() => submitThanhToan()}>
                            Thanh toán
                        </Button>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};

export default ModalXacNhanThanhToan;
