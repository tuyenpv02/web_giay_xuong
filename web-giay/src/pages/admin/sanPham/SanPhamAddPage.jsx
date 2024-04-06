import {
    Card,
    Space,
    Row,
    Col,
    Flex,
    Table,
    Typography,
    Select,
    Button,
    Input,
    InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService";
import DeGiayService from "./../../../services/DeGiayService";
import ChatLieuService from "./../../../services/ChatLieuService";
import KichCoService from "./../../../services/KichCoService";
import MauSacService from "./../../../services/MauSacService";
import { useNavigate } from "react-router-dom";

function SanPhamAddPage() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const [defaultChiTietSP, setDefaultChiTietSP] = useState({
        giaBan: 100000,
        soLuong: 10,
        sanPham: { id: null },
        deGiay: { id: null },
        chatLieu: { id: null },
        kichCo: { id: null },
        mauSac: { id: null },
    });
    const [selectMauSac, setSelectMauSac] = useState([]);
    const [selectKichCo, setSelectKichCo] = useState([]);
    const [danhSachSanPhamChiTiet, setDanhSachSanPhamChiTiet] = useState([]);

    // load data
    const [sanPhams, setSanPhams] = useState([]);
    const [deGiays, setDeGiays] = useState([]);
    const [chatLieus, setChatLieus] = useState([]);
    const [kichCos, setKichCos] = useState([]);
    const [mauSacs, setMauSacs] = useState([]);
    useEffect(() => {
        const getDaTa = async () => {
            let resSanPhams = await SanPhamService.getAll();
            let resDeGiays = await DeGiayService.getAll();
            let resChatLieus = await ChatLieuService.getAll();
            let resKichCos = await KichCoService.getAll();
            let resMauSacs = await MauSacService.getAll();

            setSanPhams([...resSanPhams]);
            setDeGiays([...resDeGiays]);
            setChatLieus([...resChatLieus]);
            setKichCos([...resKichCos]);
            setMauSacs([...resMauSacs]);
        };
        getDaTa();
    }, []);
    //

    const ThemSanPham = () => {
        let dsMau = [...selectMauSac];
        let dsKichCo = [...selectKichCo];
        const danhSachSanPhamCT = [];
        let sanPham = sanPhams.find((o) => o.id == defaultChiTietSP.sanPham.id);

        let i = 0;
        for (const color of dsMau) {
            for (const size of dsKichCo) {
                let mau = mauSacs.find((o) => o.id == color);
                let kichCo = kichCos.find((o) => o.id == size);

                // Thêm sanPhamChiTiet vào danh sách
                danhSachSanPhamCT.push({
                    ...defaultChiTietSP,
                    key: i++,
                    ten: `${sanPham.ten} [${mau.ten} - ${kichCo.ten}]`,
                    mauSac: { id: color },
                    kichCo: { id: size },
                });
            }
        }

        setDanhSachSanPhamChiTiet([...danhSachSanPhamCT]);
    };

    const updateSoLuong = (record, index, e) => {
        setDanhSachSanPhamChiTiet((pre) => {
            record.soLuong = e;
            pre.slice(index, 1, record);
            return pre;
        });
    };

    const updateGiaBan = (record, index, e) => {
        setDanhSachSanPhamChiTiet((pre) => {
            record.giaBan = e;
            pre.splice(index, 1, record);
            return pre;
        });
    };
    const xoaChiTietSanPham = (record, index) => {
        setDanhSachSanPhamChiTiet((pre) => {
            let ds = pre.filter((o) => o.key != record.key);
            return ds;
        });
    };

    const ThemSanPham2 = () => {
        console.log(danhSachSanPhamChiTiet);
    };

    const columns = [
        {
            title: "#",
            dataIndex: "ten",
            key: "ten",
            width: 20,
            render: (_, record, index) => <Typography.Text strong>{index + 1}</Typography.Text>,
        },
        {
            title: "Sản phẩm",
            dataIndex: "ten",
            key: "ten",
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: "Số lượng",
            dataIndex: "soLuong",
            key: "soLuong",
            width: 150,
            render: (text, record, index) => (
                <InputNumber
                    style={{ width: "100%" }}
                    defaultValue={record?.soLuong}
                    onChange={(e) => updateSoLuong(record, index, e)}
                />
            ),
        },

        {
            title: "Đơn giá",
            dataIndex: "giaBan",
            width: 150,
            render: (text, record, index) => (
                <>
                    <InputNumber
                        style={{ width: "100%" }}
                        defaultValue={record?.giaBan}
                        onChange={(e) => updateGiaBan(record, index, e)}
                    />
                </>
            ),
        },
        {
            title: "Action",
            render: (_, record, index) => (
                <>
                    <Button type="text" onClick={() => xoaChiTietSanPham(record, index)}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>
                </>
            ),
        },
        {
            title: "Ảnh",
            render: (_, record) => <></>,
        },
    ];
    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: "flex" }}>
                <Card size="small">
                    <Flex align="center" justify="center">
                        <Typography.Title level={4}>Thông tin sản phẩm</Typography.Title>
                    </Flex>
                    <Row justify="center">
                        <Col span={20}>
                            <Row gutter={[5, 5]}>
                                <Col span={24}>
                                    <Typography.Text>Tên sản phẩm: </Typography.Text>
                                </Col>
                                <Col span={22}>
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder="Tên sản phẩm"
                                        onChange={(e) =>
                                            setDefaultChiTietSP({
                                                ...defaultChiTietSP,
                                                sanPham: { id: e },
                                            })
                                        }
                                    >
                                        {sanPhams?.map((sp, index) => (
                                            <Select.Option key={index} value={sp?.id}>
                                                {sp?.ten}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col span={2}>
                                    <Button>
                                        <i className="fa-solid fa-plus"></i>
                                    </Button>
                                </Col>
                            </Row>
                            {/*  */}
                            <br />
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Row gutter={[5, 5]}>
                                        <Col span={24}>
                                            <Typography.Text>Đế giày: </Typography.Text>
                                        </Col>
                                        <Col span={20}>
                                            <Select
                                                style={{ width: "100%" }}
                                                placeholder="chọn đế"
                                                onChange={(e) =>
                                                    setDefaultChiTietSP({
                                                        ...defaultChiTietSP,
                                                        deGiay: { id: e },
                                                    })
                                                }
                                            >
                                                {deGiays?.map((de, index) => (
                                                    <Select.Option key={index} value={de?.id}>
                                                        {de?.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col span={2}>
                                            <Button>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                {/* <Col span={2}></Col> */}
                                <Col span={12}>
                                    <Row gutter={[5, 5]}>
                                        <Col span={24}>
                                            <Typography.Text>Chất liệu: </Typography.Text>
                                        </Col>
                                        <Col span={20}>
                                            <Select
                                                style={{ width: "100%" }}
                                                placeholder="chọn chất liệu"
                                                onChange={(e) =>
                                                    setDefaultChiTietSP({
                                                        ...defaultChiTietSP,
                                                        chatLieu: { id: e },
                                                    })
                                                }
                                            >
                                                {chatLieus?.map((sp, index) => (
                                                    <Select.Option key={index} value={sp?.id}>
                                                        {sp?.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col span={2}>
                                            <Button>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Row gutter={[5, 5]}>
                                        <Col span={24}>
                                            <Typography.Text strong>Màu sắc: </Typography.Text>
                                        </Col>
                                        <Col span={20}>
                                            <Select
                                                style={{ width: "100%" }}
                                                placeholder="chọn màu sắc"
                                                mode="multiple"
                                                onChange={(e) => setSelectMauSac(e)}
                                            >
                                                {mauSacs?.map((sp, index) => (
                                                    <Select.Option key={index} value={sp?.id}>
                                                        {sp?.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col span={2}>
                                            <Button>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                {/* <Col span={4}></Col> */}
                                <Col span={12}>
                                    <Row gutter={[5, 5]}>
                                        <Col span={24}>
                                            <Typography.Text strong>Kích cỡ: </Typography.Text>
                                        </Col>
                                        <Col span={20}>
                                            <Select
                                                mode="multiple"
                                                style={{ width: "100%" }}
                                                placeholder="chọn kích cỡ"
                                                onChange={(e) => {
                                                    setSelectKichCo(e);
                                                }}
                                            >
                                                {kichCos?.map((sp, index) => (
                                                    <Select.Option key={index} value={sp?.id}>
                                                        {sp?.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col span={2}>
                                            <Button>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/*  */}
                        </Col>
                    </Row>
                    <Flex justify="end">
                        <Button type="primary" onClick={() => ThemSanPham()}>
                            Tạo
                        </Button>
                    </Flex>
                </Card>
                {/*  */}
                <Card size="small" title={"Danh sách biến thể"}>
                    <Table columns={columns} dataSource={danhSachSanPhamChiTiet} key={"key"} />

                    <br />
                    <Flex justify="end">
                        <Button type="primary">Thêm sản phẩm</Button>
                        <Button type="primary" onClick={() => ThemSanPham2()}>
                            Thêm sản log
                        </Button>
                    </Flex>
                </Card>
            </Space>
        </>
    );
}

export default SanPhamAddPage;
