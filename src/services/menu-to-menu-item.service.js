import http from "../http-common";

class MenuToMenuItemDataService {
    create(data) {
        return http.post(`menutomenuitems`, data);
    }

    delete(menuId, menuItemId) {
        return http.delete(`menutomenuitems/${menuId}/${menuItemId}`);
    }
}

export default new MenuToMenuItemDataService();