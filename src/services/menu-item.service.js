import http from "../http-common";

class MenuItemDataService {
  getAll() {
    return http.get("/menuitems");
  }

  get(id) {
    return http.get(`/menuitems/${id}`);
  }

  create(data) {
    return http.post("/menuitems", data);
  }

  update(id, data) {
    return http.put(`/menuitems/${id}`, data);
  }

  delete(id) {
    return http.delete(`/menuitems/${id}`);
  }

  deleteAll() {
    return http.delete(`/menuitems`);
  }

  findByTitle(title) {
      return http.get(`/menuitems?title=${title}`);
  }
}

export default new MenuItemDataService();