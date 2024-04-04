import { useEffect, useState } from "react";
import APIdiaChiVN from "../../services/APIdiaChiVN";
import { Col, Row, Select } from "antd";

const DiaChiVN = ({}) => {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState();

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
    return (
        <>
            <Row gutter={2} className="my-2">
                <Col span={8}>
                    <Select placeholder="tình/thành phố" onChange={(e) => setProvince(e)}>
                        {provinces.map((province, index) => (
                            <Select.Option key={index} value={province?.province_id}>
                                {province?.province_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={8}>
                    <Select placeholder="--Chọn quận/huyện--" onChange={(e) => setDistrict(e)}>
                        {districts.map((district, index) => (
                            <Select.Option key={index} value={district?.district_id}>
                                {district?.district_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={8}>
                    <Select placeholder="--Chọn xã/phường--" onChange={(e) => setWard(e)}>
                        {wards.map((ward, index) => (
                            <Select.Option key={index} value={ward?.ward_id}>
                                {ward?.ward_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </>
    );
};

export default DiaChiVN;
