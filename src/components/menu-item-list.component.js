import React, { Component } from "react";
import MenuItemDataService from "../services/menu-item.service";
import { Link } from "react-router-dom";

export default class MenuItemList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMenuItems = this.retrieveMenuItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMenuItem = this.setActiveMenuItem.bind(this);
    this.removeAllMenuItems = this.removeAllMenuItems.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      menuitems: [],
      currentMenuItem: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  //load in menu items
  componentDidMount() {
    this.retrieveMenuItems();
  }

  //set new search title
  onChangeSearchTitle(e) {
    const tempSearch = e.target.value;

    this.setState({
      searchTitle: tempSearch
    })
  }

  //get all menu items
  retrieveMenuItems() {
    MenuItemDataService.getAll()
      .then(res => {
        this.setState({
          menuitems: res.data
        });
        console.log(res.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  //refresh list for updates
  refreshList() {
    this.retrieveMenuItems();
    this.setState({
      currentMenuItem: null,
      currentIndex: -1
    });
  }

  //set the active menu item
  setActiveMenuItem(menuitem, index) {
    this.setState({
      currentMenuItem: menuitem,
      currentIndex: index
    });
  }

  //remove all menu items
  removeAllMenuItems() {
    MenuItemDataService.deleteAll()
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
    MenuItemDataService.findByTitle(this.state.searchTitle)
      .then(res => {
        this.setState({
          menuitems: res.data
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, menuitems, currentMenuItem, currentIndex } = this.state;

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
          <h4>Menu Items List</h4>

          <ul className="list-group">
            {menuitems &&
              menuitems.map((menuitem, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMenuItem(menuitem, index)}
                  key={index}
                >
                  {menuitem.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMenuItems}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMenuItem ? (
            <div>
              <h4>Menu Item</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMenuItem.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentMenuItem.description}
              </div>
              <div>
                <label>
                  <strong>Image:</strong>
                </label>{" "}
                {currentMenuItem.image}
              </div>

              <Link
                to={"/menuitems/" + currentMenuItem.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Menu Item...</p>
              </div>
            )}
        </div>
      </div>
    )
  }

}