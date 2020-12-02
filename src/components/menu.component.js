import React, { Component } from "react";
import MenuDataService from "../services/menu.service";
import MenuItemDataService from "../services/menu-item.service";
import MenuToMenuItemDataService from "../services/menu-to-menu-item.service"

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.getMenu = this.getMenu.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
    this.retrieveMenuItems = this.retrieveMenuItems.bind(this);
    this.createRelation = this.createRelation.bind(this);
    this.deleteRelation = this.deleteRelation.bind(this);

    this.state = {
      currentMenu: {
        id: null,
        title: "",
        date: "",
        items: [],
      },
      message: "",
      allmenuitems: [],
      menuItemId: null
    };
  }

  componentDidMount() {
    this.getMenu(this.props.match.params.id);
    this.retrieveMenuItems();
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    if(this.state.currentMenu.id === null) {
      return true;
    }

    if (this.state.currentMenu.menuItems.length !== nextState.currentMenu.menuItems.length) {
      this.setState({
        message: "Menu Updated!"
      });
      return true;
    }
    else return false;
    
  } */

  onChangeTitle(e) {
    const title = e.target.value;

    //backup last title
    this.setState(function (prevState) {
      return {
        currentMenu: {
          ...prevState.currentMenu,
          title: title
        }
      };
    });
  }

  onChangeDate(e) {
    const date = e.target.value;

    //backup last date
    this.setState(prevState => ({
      currentMenu: {
        ...prevState.currentMenu,
        date: date
      }
    }));
  }

  getMenu(id) {
    MenuDataService.get(id)
      .then(res => {
        this.setState({
          currentMenu: res.data
        });
        //log in console
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMenu() {
    MenuDataService.update(
      this.state.currentMenu.id,
      this.state.currentMenu
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          message: "The menu was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMenu() {
    MenuDataService.delete(this.state.currentMenu.id)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/menus')
      })
      .catch(e => {
        console.log(e);
      });
  }

  //get all menu items
  retrieveMenuItems() {
    MenuItemDataService.getAll()
      .then(res => {
        this.setState({
          allmenuitems: res.data
        });
        console.log(res.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  //create relation
  createRelation(id) {

    var data = {
      menuId: this.state.currentMenu.id,
      menuItemId: id,
    }

    //console.log(data);

    MenuToMenuItemDataService.create(data)
      .then(res => {
        console.log(res.data);
        this.updateNewState(this.state.currentMenu.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //delete relation
  deleteRelation(id) {
    MenuToMenuItemDataService.delete(this.state.currentMenu.id, id)
      .then(res => {
        console.log(res.data);
        this.updateNewState(this.state.currentMenu.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //helper function
  updateNewState(id) {
    MenuDataService.get(id)
      .then(res => {
        this.setState({
          currentMenu: res.data
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMenu } = this.state;
    const currentitems = currentMenu.menuItems;
    const allmenuitems = this.state.allmenuitems;

    return (
      <div>
        {currentMenu ? (
          <div className="edit-form">
            <h4>Menu</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMenu.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentMenu.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMenu}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMenu}
            >
              Update
            </button>

            <div className="list row">

              {/* this menu's items */}
              <div className="col-6">
                <h4>Menu Items for Menu {currentMenu.id}</h4>
                <ul className="list-group">
                  {currentitems &&
                    currentitems.map((menuitem, index) => (
                      <div key={index} className="row" width="70%">
                        <li className="col-8 list-group-item" key={index} >
                          {menuitem.title}
                        </li>
                        <button onClick={this.deleteRelation.bind(this, menuitem.id)} type="submit" className="col-2 badge badge-danger">
                          -
                        </button>
                      </div>
                    ))
                  }
                </ul>
              </div>

              {/* all items */}
              <div className="col-6">
                <h4>All Items List</h4>

                <ul className="list-group">
                  {allmenuitems &&
                    allmenuitems.map((menuitem, index) => (
                      <div key={index} className="row" width="70%">
                        <li className="col-8 list-group-item">
                          {menuitem.title}
                        </li>
                        <button onClick={this.createRelation.bind(this, menuitem.id)} type="submit" className="col-2 badge badge-success">
                          +
                        </button>
                      </div>
                    ))
                  }
                </ul>
              </div>

            </div>


            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Menu...</p>
            </div>
          )}
      </div>
    )
  }
}