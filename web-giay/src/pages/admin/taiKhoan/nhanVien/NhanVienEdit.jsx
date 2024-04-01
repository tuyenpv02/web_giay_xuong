import { Avatar, Button, Col, DatePicker, Form, Input, Radio, Row, Select, Switch, Upload } from "antd";
import { useEffect, useState } from "react";
import * as yup from "yup";

import { useNavigate, useParams } from "react-router-dom";
import APIdiaChiVN from "./../../../../services/APIdiaChiVN";
import nhanVienService from "../../../../services/NhanVienService";
import DiaChiService from "./../../../../services/DiaChiService";
import { toast } from "react-toastify";
import getDateNow, { convertDate } from "../../../../utils/GetDateNow";
import moment from "moment";

const phoneRegExp = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7,8}$/;
const cccdRegExp = /^\d{12}$/;

const schema = yup.object({
    ten: yup.string().trim("nhập tên").required("Cần nhập tên"),
    email: yup.string().required("Cần nhập email").email("email không hợp lệ"),
    sdt: yup.string().required("Nhập sdt").matches(phoneRegExp, "Sdt không hợp lệ"),
    ngaySinh: yup.date().required("nhập ngày sinh").typeError("Ngày sinh không hợp lệ"),
    gioiTinh: yup.string().required("Cần chọn giới tính"),
    matKhau: yup.string().required("Nhận mật khẩu"),
    cccd: yup.string().required("Cccd không hợp lệ").matches(cccdRegExp, "Cccd không hợp lệ"),

    diaChi: yup.string().required("nhập địa chỉ cụ thể"),
    province: yup.string().required("Cần chọn địa chỉ"),
    district: yup.string().required("Cần chọn địa chỉ"),
    ward: yup.string().required("Cần chọn địa chỉ"),
    trangThai:null,
});

const yupSync = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};

function NhanVienEdit() {
    const params = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [diaChiNhanVien, setDiaChiNhanVien] = useState();

    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState();

    useEffect(() => {
        let getNhanVienById = async () => {
            let res = await nhanVienService.getById(params.id);
            console.log(res);
            form.setFieldValue("ten", res.ten);
            form.setFieldValue("email", res.email);
            form.setFieldValue("sdt", res.sdt);
            form.setFieldValue("matKhau", res.matKhau);
            form.setFieldValue("cccd", res.cccd);
            form.setFieldValue("ngaySinh", moment(res.ngaySinh));
            form.setFieldValue("gioiTinh", res.gioiTinh);
            form.setFieldValue("trangThai", res.trangThai);
        };
        let getDiaChiByIdNhanVien = async () => {
            let res = await DiaChiService.getByIdTaiKhoan(params.id);
            setDiaChiNhanVien([...res]);
            form.setFieldValue("province", res[0]?.thanhPho);
            form.setFieldValue("district", res[0]?.huyen);
            form.setFieldValue("ward", res[0]?.xa);
            setProvince(res[0]?.thanhPho);
            setDistrict(res[0]?.huyen);
            setWard(res[0]?.xa);
            form.setFieldValue("diaChi", res[0]?.moTa);
        };
        getNhanVienById();
        getDiaChiByIdNhanVien();
    }, []);

    useEffect(() => {
        let fetchProvince = async () => {
            let res = await APIdiaChiVN.getAllProvince();
            setProvinces(res?.results);
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        let fetchDistrict = async () => {
            let res = await APIdiaChiVN.getAllDistrict(province);
            setDistricts(res?.results);
        };
        province && fetchDistrict(province);
    }, [province]);

    useEffect(() => {
        let fetchWard = async () => {
            let res = await APIdiaChiVN.getAllWard(district);
            setWards(res?.results);
        };
        district && fetchWard();
    }, [district]);

    const submitForm = (data) => {
        const diaChi = {
            id: diaChiNhanVien[0].id,
            ten: data.ten,
            sdt: data.sdt,
            thanhPho: data.province,
            huyen: data.district,
            xa: data.ward,
            moTa: data.diaChi,
            ngayCapNhat: getDateNow(),
            trangThai: 1,
        };
        const nhanVien = {
            id: params.id,
            ten: data.ten,
            sdt: data.sdt,
            ngaySinh: convertDate(data.ngaySinh),
            email: data.email,
            gioiTinh: data.gioiTinh,
            cccd: data.cccd,
            anh: "",
            matKhau: data.matKhau,
            ngayCapNhat: getDateNow(),
            trangThai: data.trangThai?1:0,
        };
        nhanVienService
            .update(params.id, nhanVien)
            .then((res) => {
                    DiaChiService.update(diaChiNhanVien[0].id, diaChi)
                        .then((res) => {
                            toast.success("Cập nhật thành công");
                        })
                        .catch((err) => {
                            toast.warning("Thất bại ");
                            console.log(err);
                        });
                    navigate("/admin/nhan-vien");
            })
            .catch((err) => {
                toast.warning("Cập nhật thất bại ");
                console.log(err);
            });
    };

    return (
        <div>
            <Row gutter={2}>
                <Col span={3}></Col>
                <Col span={18}>
                    <Form
                        onFinish={submitForm}
                        form={form}
                        layout="vertical"
                        style={{
                            maxWidth: 600,
                        }}
                        autoComplete="off"
                    >
                        <Row justify={"center"} align={"middle"}>
                            <h2>Tạo tài khoản nhân viên</h2>

                            <Col span={12}>
                                <Avatar style={{ height: "200px", width: "200px" }} />
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col span={24}>
                                <Form.Item name="ten" label="Họ tên" rules={[yupSync]}>
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*  */}
                        <Row gutter={[20, 0]} justify={"center"}>
                            <Col span={12}>
                                <Form.Item name="cccd" label="Căn cước công dân" rules={[yupSync]}>
                                    <Input placeholder="Căn cước công dân" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="matKhau" label="mật khẩu" rules={[yupSync]}>
                                    <Input.Password placeholder="mật khẩu" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[20, 0]} justify={"center"}>
                            <Col span={12}>
                                <Form.Item name="email" label="Email" rules={[yupSync]}>
                                    <Input placeholder="Email" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="sdt" label="Số điện thoại" rules={[yupSync]}>
                                    <Input placeholder="Số điện thoại" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*  */}
                        <Row gutter={[20, 0]} justify={"center"}>
                            <Col span={12}>
                                <Form.Item name="ngaySinh" label="Ngày sinh" rules={[yupSync]}>
                                    <DatePicker format="YYYY-MM-DD" width={100} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="gioiTinh" label="Giới tính" rules={[yupSync]}>
                                    <Radio.Group>
                                        <Radio value={1}> Nam </Radio>
                                        <Radio value={0}> Nữ </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*  */}
                        <Row gutter={2} className="my-2">
                            <Col span={8}>
                                <Form.Item name="province" label="Địa chỉ" rules={[yupSync]}>
                                    <Select
                                        placeholder="tình/thành phố"
                                        onChange={(e) => setProvince(e)}
                                    >
                                        {provinces.map((province, index) => (
                                            <Select.Option
                                                key={index}
                                                value={province?.province_id}
                                            >
                                                {province?.province_name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="district" label=" " rules={[yupSync]}>
                                    <Select
                                        placeholder="--Chọn quận/huyện--"
                                        onChange={(e) => setDistrict(e)}
                                    >
                                        {districts.map((district, index) => (
                                            <Select.Option
                                                key={index}
                                                value={district?.district_id}
                                            >
                                                {district?.district_name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="ward" label=" " rules={[yupSync]}>
                                    <Select
                                        placeholder="--Chọn xã/phường--"
                                        onChange={(e) => setWard(e)}
                                    >
                                        {wards.map((ward, index) => (
                                            <Select.Option
                                                key={ward?.ward_id}
                                                value={ward?.ward_id}
                                            >
                                                {ward?.ward_name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[20, 0]} justify={"center"}>
                            <Col span={24}>
                                <Form.Item name="diaChi" label="Mô tả" rules={[yupSync]}>
                                    <Input.TextArea placeholder="Địa chỉ" multiple />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[20, 0]} justify={"center"}>
                            <Col span={24}>
                                <Form.Item name="trangThai" label="trạng thái" >
                                    <Switch  />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*  */}
                        <Row justify={"center"}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật nhân viên
                            </Button>
                        </Row>
                    </Form>
                </Col>
                <Col span={3}></Col>
            </Row>
            {/* </Form> */}
        </div>
    );
}

export default NhanVienEdit;
