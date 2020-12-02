import http from "../http-common";

class MenuDataService {
  getAll() {
    return http.get("/menus");
  }

  get(id) {
    return http.get(`/menus/${id}`);
  }

  create(data) {
    return http.post("/menus", data);
  }

  update(id, data) {
    return http.put(`/menus/${id}`, data);
  }

  delete(id) {
    return http.delete(`/menus/${id}`);
  }

  deleteAll() {
    return http.delete(`/menus`);
  }

  findByTitle(title) {
    return http.get(`/menus?title=${title}`);
  }

  findByDate(date) {
    return http.get(`/menus/date/${date}`);
  }
  
}

export default new MenuDataService();