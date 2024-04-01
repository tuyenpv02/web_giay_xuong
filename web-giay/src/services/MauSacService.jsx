import request from "./Request";

class MauSacService {
    static getAll = async () => {
        let res = await request.get(`mau-sac`);
        return res.data;
    };

    // detail by id
    static getById = async (id) => {
        let res = await request.get(id);
        // console.log(res);
        return res.data;
    };

    // delete
    static delete(id) {
        return request.delete("mau-sac/" + id);
    }

    // add
    static add(data) {
        // console.log("aad ", data);
        return request.post("http://localhost:8080/mau-sac", data);
    }

    // update
    static update(id, data) {
        // console.log("u ", id, data);
        return request.put("mau-sac/" + id, data);
    }

    static search(seachText) {
        return request.get("mau-sac/search", {
            params: {
                seachText,
            },
        });
    }
}

export default MauSacService;
