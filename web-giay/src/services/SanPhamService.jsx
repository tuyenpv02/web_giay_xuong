// eslint-disable-next-line no-unused-vars
import request from "./Request";

class SanPhamService {
    static getAll = async () => {
        let res = await request.get(`san-pham`);
        return res.data;
    };

    // detail by id
    static getById = async (id) => {
        let res = await request.get(`san-pham/`+id);
        return res.data;
    };
      // filter
      static filter = async ({ searchText, trangThai  }) => {
        console.log(searchText, trangThai, 'sa');
        let res = await request.get(`san-pham/filter`, {
            params: {
                searchText,
                trangThai 
            },
        });
        return res.data;
    };

    // add
    static add(data) {
        console.log('data',data);
        return request.post("san-pham", data);
    }

     // update
     static update(id, data) {
        return request.put("san-pham/" + id, data);
    }
}

export default SanPhamService;
