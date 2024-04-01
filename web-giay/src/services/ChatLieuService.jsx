// eslint-disable-next-line no-unused-vars
import React from "react";
import request from "./Request";

class ChatLieuService {
    static getAll = async () => {
        let res = await request.get(`chat-lieu`);
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
        return request.delete("chat-lieu/" + id);
    }

    // add
    static add(data) {
        // console.log("aad ", data);
        return request.post("http://localhost:8080/chat-lieu", data);
    }

    // update
    static update(id, data) {
        // console.log("u ", id, data);
        return request.put("chat-lieu/" + id, data);
    }

    static search(seachText) {
        return request.get("chat-lieu/search", {
            params: {
                seachText,
            },
        });
    }
}

export default ChatLieuService;
