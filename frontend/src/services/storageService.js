import http from "../http-common";

const getAll = () => {
    return http.get("/storage");
};

const get = id => {
return http.get(`/storage/${id}`);
};

const create = data => {
    let formData = new FormData();

    formData.append('data', data);
    
    return http.post("/storage", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};

const update = (id, data) => {
return http.put(`/storage/${id}`, data);
};

const remove = id => {
return http.delete(`/storage/${id}`);
};

const removeAll = () => {
return http.delete(`/storage`);
};

const findByName = name => {
return http.get(`/storage?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};