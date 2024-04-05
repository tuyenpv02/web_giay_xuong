// eslint-disable-next-line no-unused-vars
import request from "./Request";

class HoaDonService {
    static getAll = async () => {
        let res = await request.get(`hoa-don`);
        return res.data;
    };

    // filter
    static filter = async ({ searchText, trangThai, loaiHoaDon, ngayBatDau, ngayKetThuc }) => {
        // console.log(searchText, trangThai, loaiHoaDon, ngayBatDau, ngayKetThuc);
        let res = await request.get(`hoa-don/filter`, {
            params: {
                searchText,
                trangThai,
                loaiHoaDon,
                ngayBatDau,
                ngayKetThuc,
            },
        });
        return res.data;
    };

    // update
    static update(id, hoaDon, trangThai) {
        const data = {
            ...hoaDon,
            trangThai: trangThai,
        };
        // console.log('data', data);
        return request.put("hoa-don/" + id, data);
    }

    // update
    static updateHoaDon(id, hoaDon) {
        const data = {
            ...hoaDon,
        };
        // console.log('data', data, id);
        return request.put("hoa-don/" + id, data);
    }

    // detail by id
    static getById = async (id) => {
        let res = await request.get("hoa-don/" + id);
        return res.data;
    };
}

export default HoaDonService;
