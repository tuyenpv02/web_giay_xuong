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
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService";
import DeGiayService from "./../../../services/DeGiayService";
import ChatLieuService from "./../../../services/ChatLieuService";
import KichCoService from "./../../../services/KichCoService";
import MauSacService from "./../../../services/MauSacService";
import { useNavigate } from "react-router-dom";
import ChiTietSanPhamService from "./../../../services/ChiTietSanPhamService";
import { toast } from "react-toastify";
import { randomChuoi } from "../../../utils/RandomChuoi";
import UpLoadAnhSP from "./UpLoadAnhSP";
import UpAnhCloud from "./UpAnhCloud";
import { upLoadFiles } from "../../../utils/UpLoadAnhCLoudinary";
import ModalThemSP from "./ModalThemSP";
import AnhService from "../../../services/AnhService";
import getDateNow from "../../../utils/GetDateNow";

function SanPhamAddPage() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const [defaultChiTietSP, setDefaultChiTietSP] = useState({
        giaBan: 100000,
        soLuong: 10,
        ma: "",
        moTa: "",
        trangThai: 1,
        anh: null,
        sanPham: { id: null },
        deGiay: { id: null },
        chatLieu: { id: null },
        kichCo: { id: null },
        mauSac: { id: null },
    });
    const [lstAnh, setLstAnh] = useState([]);

    const [check, setCheck] = useState(false);
    const [disabledThongTin, setDisabledThongTin] = useState(false);
    const [selectMauSac, setSelectMauSac] = useState([]);
    const [selectKichCo, setSelectKichCo] = useState([]);
    const [danhSachSanPhamChiTiet, setDanhSachSanPhamChiTiet] = useState([]);
    const [dataListTable, setDataListTable] = useState([]);

    useEffect(() => {
        let ds = nhomTheoMau([...danhSachSanPhamChiTiet]);
        setDataListTable([...ds]);
    }, [danhSachSanPhamChiTiet]);

    // check chọn đủ thuộc tính
    useEffect(() => {
        const { sanPham, deGiay, chatLieu } = defaultChiTietSP;
        if (sanPham.id && deGiay.id && chatLieu.id) {
            setCheck(true);
        }
    }, [defaultChiTietSP, selectKichCo, selectMauSac]);

    const findTenMauById = (id) => {
        let mau = mauSacs.find((o) => o.id === id);
        return mau?.ten;
    };

    const nhomTheoMau = (ds) => {
        // nhóm các đối tượng thành mảng
        const groups = ds.reduce((acc, object) => {
            const group = (acc[object?.mauSac?.id] ??= []);
            group.push(object);
            return acc;
        }, {});
        // gom thành mảng chứa các mảng
        const groupsArray = Object.values(groups);
        return groupsArray;
    };

    // loc trung mau sac va kich co
    const locTrungSanPhamCT = (dsSP) => {
        const uniqueData = dsSP.reduce((accumulator, current) => {
            const existingObject = accumulator.find(
                (obj) => obj.mauSac.id === current.mauSac.id && obj.kichCo.id === current.kichCo.id
            );
            if (!existingObject) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        return uniqueData;
    };

    const gomMang = () => {
        const objects = danhSachSanPhamChiTiet.reduce((acc, group) => {
            return acc.concat(group);
        }, []);
        return objects;
    };

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
    }, [load]);
    //

    // tạo sản phẩm chi tiết
    const ThemSanPham = () => {
        if (!check) {
            toast.warning("Chọn đủ dữ liệu sản phẩm, màu sắc, chất liệu");
            return;
        }
        setDisabledThongTin(true);

        let sanPham = sanPhams.find((o) => o.id == defaultChiTietSP.sanPham.id);

        const danhSachSanPhamCT = [];
        let dsKichCo = [...selectKichCo];
        let dsMau = [...selectMauSac];

        for (const color of dsMau) {
            for (const size of dsKichCo) {
                let mau = mauSacs.find((o) => o.id == color);
                let kichCo = kichCos.find((o) => o.id == size);
                let check = danhSachSanPhamChiTiet.find(
                    (o) => o.mauSac.id == color && o.kichCo.id == size
                );
                if (check) {
                    continue;
                }
                // Thêm sanPhamChiTiet vào danh sách
                danhSachSanPhamCT.push({
                    ...defaultChiTietSP,
                    key: uuidv4().substring(0, 3),
                    ten: `${sanPham.ten} [${mau.ten} - ${kichCo.ten}]`,
                    ma: `sp00${sanPham.id}${mau.id}${kichCo.id}${randomChuoi()}`,
                    mauSac: { id: color },
                    kichCo: { id: size },
                });
            }
        }
        let ds = [...danhSachSanPhamCT, ...danhSachSanPhamChiTiet];
        setDanhSachSanPhamChiTiet([...ds]);
    };

    const updateSoLuong = (record, index, e) => {
        setDanhSachSanPhamChiTiet((pre) => {
            record.soLuong = e;
            pre.splice(index, 1, record);
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
        let ds = danhSachSanPhamChiTiet.filter((o, idx) => o.key != record.key);
        setDanhSachSanPhamChiTiet([...ds]);
    };

    // tạo sản phẩm chi tiết trong db
    const taoSanPhamChiTiet = async () => {
        if (danhSachSanPhamChiTiet.length < 1) {
            toast.warning("Thiếu dữ liệu");
            return;
        }

        danhSachSanPhamChiTiet.forEach((o) => {
            let { key, anh, ...object } = o;

            ChiTietSanPhamService.add(object)
                .then((res) => {
                    luuAnh(anh, res.data);
                    toast.success("Thêm sản phẩm thành công");
                    setTimeout(() => {
                        // navigate("/admin/san-pham");
                    }, 2000);
                })
                .catch((err) => {
                    toast.error("Thêm sản phẩm thất bại! ", err.message);
                });
        });
    };

    // lưu ảnh vào cloudinary và db
    const luuAnh = async (anhs, ctsps) => {
        console.log("ảnh ", anhs, ctsps);
        if (anhs != null) {
            let getUrls = async () => {
                let resAnh = await upLoadFiles(anhs);
                resAnh?.forEach((img) => {
                    const anhData = {
                        chiTietSanPham: { id: ctsps.id },
                        ten: ctsps.ten,
                        url: img,
                        ngayTao: getDateNow(),
                    };
                    console.log("anhData", anhData);
                    AnhService.add(anhData)
                        .then((res) => {
                            // toast.success("thêm ảnh thành công");
                        })
                        .catch((err) => {
                            toast.error("lỗi thêm ảnh ", err);
                        });
                });
            };
            getUrls();
        } else {
            setLstAnh([]);
        }
    };

    const ThemSanPham2 = () => {
        console.log(" ds -", danhSachSanPhamChiTiet);
    };

    const columns = [
        {
            title: "#",
            dataIndex: "ten",
            width: 50,
            render: (_, record, index) => <Typography.Text strong>{index + 1}</Typography.Text>,
        },
        {
            title: "Sản phẩm",
            dataIndex: "ten",
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: "Số lượng",
            dataIndex: "soLuong",
            width: 150,
            render: (text, record, index) => (
                <InputNumber
                    style={{ width: "100%" }}
                    min={0}
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
                        min={0}
                        defaultValue={record?.giaBan}
                        onChange={(e) => updateGiaBan(record, index, e)}
                    />
                </>
            ),
        },
        {
            title: "Action",
            width: 50,
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
            render: (_, record, index) => (
                <>
                    <Button type="text" onClick={() => console.log("chưa ")}>
                        Thêm
                    </Button>
                </>
            ),
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
                                        disabled={disabledThongTin}
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
                                    <ModalThemSP
                                        load={load}
                                        setLoad={setLoad}
                                        disabledThongTin={disabledThongTin}
                                    />
                                    {/* <Button disabled={disabledThongTin}>
                                        <i className="fa-solid fa-plus"></i>
                                    </Button> */}
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
                                                disabled={disabledThongTin}
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
                                            <Button disabled={disabledThongTin}>
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
                                                disabled={disabledThongTin}
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
                                            <Button disabled={disabledThongTin}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/*  */}
                            <br />
                            <Row gutter={[5, 5]}>
                                <Col span={24}>
                                    <Typography.Text>Mô tả: </Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Input.TextArea
                                        value={defaultChiTietSP.moTa}
                                        onChange={(e) =>
                                            setDefaultChiTietSP({
                                                ...defaultChiTietSP,
                                                moTa: e.target.value,
                                            })
                                        }
                                    />
                                </Col>
                            </Row>
                            {/*  */}
                        </Col>
                    </Row>
                </Card>
                {/*  */}
                <Card size="small">
                    <Flex align="center" justify="center">
                        <Typography.Title level={4}>Màu sắc và kích cỡ</Typography.Title>
                    </Flex>
                    <Row justify="center">
                        <Col span={20}>
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
                    {dataListTable.map((o, index) => (
                        <Flex vertical key={index}>
                            <Flex style={{ backgroundColor: "#d9dbdd" }} justify="start">
                                <Typography.Title className="m-1" level={4}>
                                    Các sản phẩm màu {findTenMauById(o[0]?.mauSac?.id)}
                                </Typography.Title>
                            </Flex>
                            {/* table */}
                            <Table
                                columns={columns}
                                dataSource={o}
                                key={"key"}
                                pagination={false}
                                bordered
                            />
                            {/* upload ảnh */}
                            <br />
                            {/* <Typography.Title className="m-2" level={4}>
                                    Ảnh
                                </Typography.Title> */}
                            <Flex justify="center">
                                <Flex>
                                    <UpLoadAnhSP lstCTSP={o} />
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}

                    <br />
                    <Flex justify="end">
                        <Button type="primary" onClick={() => taoSanPhamChiTiet()}>
                            Thêm sản phẩm
                        </Button>
                        <Button type="primary" onClick={() => ThemSanPham2()}>
                            Thêm log
                        </Button>
                    </Flex>
                </Card>
            </Space>
        </>
    );
}

export default SanPhamAddPage;
