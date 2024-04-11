// eslint-disable-next-line no-unused-vars
import request from "./Request";

class PhuongThucThanhToanService {
    static getAllByHD = async (idHoaDon) => {
        let res = await request.get(`phuong-thuc-thanh-toan`, {
            params: {
                idHoaDon,
            },
        });
        return res.data;
    };

    // add
    static add(data) {
        return request.post("phuong-thuc-thanh-toan", data);
    }

    // delete
    static delete(id) {
        return request.delete("phuong-thuc-thanh-toan/" + id);
    }
}

export default PhuongThucThanhToanService;
