import axios from "axios";

const API = 'https://vapi.vnappmob.com/api/'

class APIdiaChiVN {

    static getAllProvince = async () => {
        let res = await axios.get(`${API}province`);
        return res.data;
    };

    static getAllDistrict = async (province_id) => {
        let res = await axios.get(`${API}province/district/${province_id}`);
        return res.data;
    };

    static getAllWard = async (district_id) => {
        let res = await axios.get(`${API}province/ward/${district_id}`);
        return res.data;
    };


}

export default APIdiaChiVN