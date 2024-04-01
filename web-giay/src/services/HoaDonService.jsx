// eslint-disable-next-line no-unused-vars
import request from "./Request";

class HoaDonService {
    static getAll = async () => {
        let res = await request.get(`hoa-don`);
        return res.data;
    };

    // filter
    static filter = async ({ searchText, trangThai, loaiHoaDon, ngayBatDau, ngayKetThuc }) => {
        console.log(searchText, trangThai, loaiHoaDon, ngayBatDau, ngayKetThuc);
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

    // detail by id
    static getById = async (id) => {
        let res = await request.get(id);
        return res.data;
    };
}

export default HoaDonService;
