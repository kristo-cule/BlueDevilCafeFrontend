import React, { Component } from "react";
import MenuDataService from "../services/menu.service";
import { Link } from "react-router-dom";

export default class MenuList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMenus = this.retrieveMenus.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMenu = this.setActiveMenu.bind(this);
    this.removeAllMenus = this.removeAllMenus.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      menus: [],
      currentMenu: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  //load in menus
  componentDidMount() {
    this.retrieveMenus();
  }

  //set new search title
  onChangeSearchTitle(e) {
    const tempSearch = e.target.value;

    this.setState({
      searchTitle: tempSearch
    })
  }

  //get all menus
  retrieveMenus() {
    MenuDataService.getAll()
      .then(res => {
        this.setState({
          menus: res.data
        });
        console.log(res.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  //refresh list for updates
  refreshList() {
    this.retrieveMenus();
    this.setState({
      currentMenu: null,
      currentIndex: -1
    });
  }

  //set the active menu
  setActiveMenu(menu, index) {
    this.setState({
      currentMenu: menu,
      currentIndex: index
    });
  }

  //remove all menu items
  removeAllMenus() {
    MenuDataService.deleteAll()
      .then(res => {
        console.log(res.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  //searching by title
  searchTitle() {
    MenuDataService.findByTitle(this.state.searchTitle)
      .then(res => {
        this.setState({
          menus: res.data
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, menus, currentMenu, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Menus List</h4>

          <ul className="list-group">
            {menus &&
              menus.map((menu, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMenu(menu, index)}
                  key={index}
                >
                  {menu.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMenus}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMenu ? (
            <div>
              <h4>Menu</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMenu.title}
              </div>
              <div>
                <label>
                  <strong>Date:</strong>
                </label>{" "}
                {currentMenu.date}
              </div>

              <Link
                to={"/menus/" + currentMenu.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Menu...</p>
              </div>
            )}
        </div>
      </div>
    )
  }
}