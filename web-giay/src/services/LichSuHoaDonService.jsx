// eslint-disable-next-line no-unused-vars
import request from "./Request";

class LichSuHoaDonService {

    static getAllByHD = async (idHoaDon) => {
        let res = await request.get(`lich-su-hoa-don`,{
            params: {
                idHoaDon,
            },
        });
        return res.data;
    };

    // add
    static add(data) {
        return request.post("lich-su-hoa-don", data);
    }
}

export default LichSuHoaDonService;
