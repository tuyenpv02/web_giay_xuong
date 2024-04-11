// eslint-disable-next-line no-unused-vars
import request from "./Request";

class ChiTietSanPhamService {
    static getAll = async () => {
        let res = await request.get(`chi-tiet-san-pham`);
        return res.data;
    };

    static getAllBySP = async (idSP) => {
        let res = await request.get(`chi-tiet-san-pham/san-pham`, {
            params: {
                id:idSP,
            },
        });
        return res.data;
    };

    static findById = async (id) => {
        let res = await request.get(`chi-tiet-san-pham/`+id);
        return res.data;
    };

      // add
      static add(data) {
        // console.log('data ', data);
        return request.post("chi-tiet-san-pham", data);
    }

     // add
     static addAll(data) {
        return request.post("chi-tiet-san-pham/saveAll", data);
    }

    // update
    static update(id, data) {
        return request.put("chi-tiet-san-pham/" + id, data);
    }


}

export default ChiTietSanPhamService;
