// eslint-disable-next-line no-unused-vars
import request from "./Request";

class SanPhamService {
    static getAll = async () => {
        let res = await request.get(`san-pham`);
        return res.data;
    };

    // detail by id
    static getById = async (id) => {
        let res = await request.get(`san-pham`+id);
        return res.data;
    };

    static search(seachText) {
        return request.get("san-pham/search", {
            params: {
                seachText,
            },
        });
    }
}

export default SanPhamService;
