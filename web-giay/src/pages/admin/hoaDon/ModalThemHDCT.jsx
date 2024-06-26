/* eslint-disable react/prop-types */
import { Button, Modal, Input, Table, Typography, Space, InputNumber } from "antd";
import { useEffect, useState } from "react";
import ChiTietSanPhamService from "../../../services/ChiTietSanPhamService";
import { formatPrice } from "../../../utils/formatNumber";
import HoaDonChiTietService from "../../../services/HoaDonChiTietService";
import { toast } from "react-toastify";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import getDateNow from "../../../utils/GetDateNow";
import LichSuHoaDonService from "../../../services/LichSuHoaDonService";

const ModalThemHDCT = ({ hoaDon, isLoad, setIsLoad }) => {
    const [dataSource, setDataSource] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [soLuong, setSoLuong] = useState(1);

    const [lichSuHD, setLichSuHD] = useState({
        hoaDon: { id: hoaDon?.id },
        ghiChu: "Chỉnh sửa sản phẩm trong đơn hàng",
        trangThai: 9,
        hanhDong: 2,
        ngayTao: getDateNow(),
        nguoiTao: "anph779",
    });

    const [newHoaDonChiTiet, setNewHoaDonChiTiet] = useState({
        idHoaDon: { id: hoaDon?.id },
        idChiTietSanPham: null,
        soLuong: 1,
        donGia: null,
    });

    const [open, setOpen] = useState(false);
    // modal só lượng
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
        setNewHoaDonChiTiet(null);
        setSoLuong(1);
    };
    const handleOk = async (e) => {
        let ctsp = await ChiTietSanPhamService.findById(newHoaDonChiTiet.idChiTietSanPham);
        if (soLuong > ctsp.soLuong) {
            toast.warning("Vượt quá số lượng tồn");
            return;
        }
        const data = {
            soLuong: soLuong,
            donGia: newHoaDonChiTiet.donGia,
            hoaDon: {
                id: hoaDon?.id,
            },
            chiTietSanPham: {
                id: newHoaDonChiTiet.idChiTietSanPham,
            },
            trangThai: 1,
        };
        const lsHD = { ...lichSuHD, hoaDon: { id: hoaDon?.id } };
        HoaDonChiTietService.add(data)
            .then((res) => {
                LichSuHoaDonService.add(lsHD);
                setIsLoad(!isLoad);
                toast.success("Thêm thành công ");
            })
            .catch((err) => {
                toast.error("Thất bại 1", err);
            });
        handleCancel();
    };

    const themHoaDonChiTiet = (record) => {
        setIsModalOpen(true);
        setNewHoaDonChiTiet({
            idHoaDon: { id: hoaDon?.id },
            idChiTietSanPham: record.id,
            donGia: record?.giaBan,
        });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                let res = await ChiTietSanPhamService.getAll();
                setDataSource([...res]);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const columnsSanPham = [
        {
            title: "#",
            render: (text, record, index) => (
                <>
                    <Typography.Text size={"large"}>{index + 1}</Typography.Text>
                </>
            ),
        },
        {
            title: "Sản phẩm",
            dataIndex: "chiTietSanPham",
            width: 200, // Fixed width of 200 pixels
            render: (text, record) => <Typography.Text strong>{record.ten}</Typography.Text>,
        },
        {
            title: "Màu sắc",
            // dataIndex: "soLuong",
            render: (text, record) => <Typography.Text>{record.mauSac.ten}</Typography.Text>,
        },
        {
            title: "Kích cỡ",
            // dataIndex: "soLuong",
            render: (text, record) => <Typography.Text>{record.kichCo.ten}</Typography.Text>,
        },
        {
            title: "Số lượng",
            dataIndex: "soLuong",
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: "Giá bán",
            dataIndex: "giaBan",
            render: (text) => (
                <>
                    <Typography.Text strong>{formatPrice(text)}</Typography.Text>
                </>
            ),
        },
        {
            title: "Thao tác",
            render: (text, record) => (
                <>
                    <Button onClick={() => themHoaDonChiTiet(record)} type="primary">
                        Chọn
                    </Button>
                </>
            ),
        },
    ];
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                    console.log(open);
                }}
            >
                Thêm sản phẩm
            </Button>

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Chọn sản phẩm"
                centered
                width={800}
                footer={false}
            >
                <Input placeholder="tìm kiếm" style={{ width: 300, marginBottom: "10px" }} />
                <Table rowKey={"id"} columns={columnsSanPham} dataSource={dataSource} />
            </Modal>

            <Modal title="Số lượng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Space wrap>
                    <Button icon={<MinusOutlined />} onClick={() => setSoLuong(soLuong - 1)} />
                    <InputNumber
                        type="number"
                        min={0}
                        onChange={(e) => setSoLuong(e)}
                        value={soLuong}
                    />
                    <Button icon={<PlusOutlined />} onClick={() => setSoLuong(soLuong + 1)} />
                </Space>
            </Modal>
        </div>
    );
};

export default ModalThemHDCT;
