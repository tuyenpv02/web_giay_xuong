// eslint-disable-next-line no-unused-vars
import request from "./Request";

class ChiTietSanPhamService {
    static getAll = async () => {
        let res = await request.get(`chi-tiet-san-pham`);
        return res.data;
    };
    static findById = async (id) => {
        let res = await request.get(`chi-tiet-san-pham/`+id);
        return res.data;
    };

}

export default ChiTietSanPhamService;
