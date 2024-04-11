/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import APIdiaChiVN from "../../../services/APIdiaChiVN";
import * as yup from "yup";
import { toast } from "react-toastify";
import HoaDonService from "../../../services/HoaDonService";
import getDateNow from "../../../utils/GetDateNow";
import LichSuHoaDonService from "../../../services/LichSuHoaDonService";

const phoneRegExp = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7,8}$/;
const schema = yup.object({
    hoTen: yup.string().trim("nhập tên").required("Cần nhập tên"),
    sdt: yup.string().required("Nhập sdt").matches(phoneRegExp, "Sdt không hợp lệ"),

    diaChi: yup.string().required("nhập địa chỉ cụ thể"),
    province: yup.string().required("Cần chọn địa chỉ"),
    district: yup.string().required("Cần chọn địa chỉ"),
    ward: yup.string().required("Cần chọn địa chỉ"),
});
const yupSync = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};

//
const ModalSuaThongTin = ({ isLoad, setIsLoad, hoaDon }) => {
    const [form] = Form.useForm();

    const [lichSuHD, setLichSuHD] = useState({
        hoaDon: { id: hoaDon?.id },
        ghiChu: "Cập nhật thông tin địa chỉ",
        trangThai: 8,
        hanhDong: 2,
        ngayTao: getDateNow(),
        nguoiTao: "anph779",
    });

    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState();
    const [diaChiCuThe, setDiaChiCuThe] = useState();

    // set value khi thay đổi địa chỉ
    useEffect(() => {
        form.setFieldValue("hoTen", hoaDon?.hoTen);
        form.setFieldValue("sdt", hoaDon?.sdt);
        let setDiaCHi = async () => {
            let diaChiCuThe = await hoaDon?.diaChi.split(",");
            form.setFieldValue("diaChi", diaChiCuThe[0]);

            let res = await APIdiaChiVN.getAllProvince();
            let dia = res?.results?.find((o) => o.province_name == diaChiCuThe[3]);
            // setProvinces((pre) => res?.results);
            setProvince((pre) => dia?.province_id);
            form.setFieldValue("province", dia.province_id);

            let resDistrict = await APIdiaChiVN.getAllDistrict(dia?.province_id);
            let quanHuyen = resDistrict?.results?.find((o) => o.district_name == diaChiCuThe[2]);
            // setDistricts(resDistrict?.results);
            setDistrict((pre) => quanHuyen?.district_id);
            form.setFieldValue("district", quanHuyen.district_id);

            let resWards = await APIdiaChiVN.getAllWard(quanHuyen?.district_id);
            let xaPhuong = resWards?.results?.find((o) => o.ward_name == diaChiCuThe[1]);
            // setDistricts(resWards?.results);
            setWard((pre) => xaPhuong?.ward_id);
            form.setFieldValue("ward", xaPhuong.ward_id);
        };
        setDiaCHi();
    }, [hoaDon]);

    // call api địa chỉ tình thành phố
    let fetchProvince = async () => {
        let res = await APIdiaChiVN.getAllProvince();
        setProvinces(res?.results);
        return res;
    };
    useEffect(() => {
        fetchProvince();
    }, []);

    useEffect(() => {
        let fetchDistrict = async () => {
            let res = await APIdiaChiVN.getAllDistrict(province);
            setDistricts(res?.results);
        };
        province && fetchDistrict();
    }, [province]);

    useEffect(() => {
        let fetchWard = async () => {
            let res = await APIdiaChiVN.getAllWard(district);
            setWards(res?.results);
        };
        district && fetchWard();
    }, [district]);

    // Open Modal thay đổi thông tin
    const [modalSuaThongTin, setModalSuaThongTin] = useState(false);
    const ShowSuaModalThongTin = () => {
        setModalSuaThongTin(true);
    };
    const handleCancelModalSuaThongTin = () => {
        setModalSuaThongTin(false);
    };

    // cập nhật địa chỉ hóa đơn
    const submitForm = async (values) => {
        let thanhPho = provinces.find((o) => o.province_id === province);
        let huyen = districts.find((o) => o.district_id === district);
        let xa = wards.find((o) => o.ward_id === ward);
        let address =
            values.diaChi +
            "," +
            xa.ward_name +
            "," +
            huyen.district_name +
            "," +
            thanhPho.province_name;

        const data = { ...hoaDon, diaChi: address, hoTen: values.hoTen, sdt: values.sdt };
        const lsHD = {...lichSuHD, hoaDon:{id:hoaDon?.id} };

        HoaDonService.updateHoaDon(hoaDon?.id, data)
            .then((res) => {
                LichSuHoaDonService.add(lsHD);
                setIsLoad(!isLoad);
                toast.success("Cập nhật thành công");
            })
            .catch((err) => {
                toast.error("Cập nhật thất bại " + err);
            });
        handleCancelModalSuaThongTin();
    };

    //
    return (
        <>
            <Button type="primary" onClick={ShowSuaModalThongTin}>
                Thay đổi thông tin
            </Button>
            {/* modal thay đổi thông tin */}
            <Modal
                width={700}
                open={modalSuaThongTin}
                onCancel={handleCancelModalSuaThongTin}
                footer={false}
            >
                <Form onFinish={submitForm} form={form} layout="vertical">
                    <Row gutter={[20, 0]} justify={"center"}>
                        <Col span={12}>
                            <Form.Item name="hoTen" label="họ tên" rules={[yupSync]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="sdt" label="Số điện thoại" rules={[yupSync]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={2} className="my-2">
                        <Col span={8}>
                            <Form.Item name="province" label="Địa chỉ" rules={[yupSync]}>
                                <Select
                                    // value={province}
                                    placeholder="tình/thành phố"
                                    onChange={(e) => {
                                        setProvince(e);
                                        form.resetFields(["district", "ward"]);
                                    }}
                                >
                                    {provinces?.map((province, index) => (
                                        <Select.Option key={index} value={province?.province_id}>
                                            {province?.province_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="district" label=" " rules={[yupSync]}>
                                <Select
                                    // value={district}
                                    placeholder="--Chọn quận/huyện--"
                                    onChange={(e) => {
                                        setDistrict(e);
                                        form.resetFields(["ward"]);
                                    }}
                                >
                                    {districts?.map((district, index) => (
                                        <Select.Option key={index} value={district?.district_id}>
                                            {district?.district_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="ward" label=" " rules={[yupSync]}>
                                <Select
                                    // value={ward}
                                    placeholder="--Chọn xã/phường--"
                                    onChange={(e) => setWard(e)}
                                >
                                    {wards?.map((ward, index) => (
                                        <Select.Option key={index} value={ward?.ward_id}>
                                            {ward?.ward_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[20, 0]} justify={"center"}>
                        <Col span={24}>
                            <Form.Item name={"diaChi"} label="địa chỉ cụ thể" rules={[yupSync]}>
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="d-flex justify-content-end ">
                                <Button htmlType="submit" type="primary">
                                    Thay đổi
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default ModalSuaThongTin;
