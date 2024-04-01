// eslint-disable-next-line no-unused-vars
import request from "./Request";

class HoaDonChiTietService {
    static getAllByHD = async (idHoaDon) => {
        let res = await request.get(`hoa-don-chi-tiet`, {
            params: {
                idHoaDon,
            },
        });
        console.log(idHoaDon);
        console.log('hdct dđ', res.data);
        return res.data;
    };

  // delete
  static delete(id) {
    return request.delete("hoa-don-chi-tiet/" + id);
}

// add
static add(data) {
    return request.post("hoa-don-chi-tiet", data);
}
}

export default HoaDonChiTietService;
