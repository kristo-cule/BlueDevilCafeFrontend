import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMenuItem from "./components/add-menu-item.component";
import MenuItem from "./components/menu-item.component";
import MenuItemList from "./components/menu-item-list.component";

import AddMenu from "./components/add-menu.component";
import Menu from "./components/menu.component";
import MenuList from "./components/menu-list.component";

import Home from "./components/home";
import Calendar from "./components/calendar";
import Cart from "./components/cart";

import Login from "./components/login"

class App extends Component {

  //create state for loggedin 
  constructor(props) {
    super(props);
    this.handleLogonChange = this.handleLogonChange.bind(this);

    this.state = {
      isLoggedIn: false,
      cart: {

      }
    }
  }

  handleLogonChange(b) {
    if (b) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  userNav = () => (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/menus" className="navbar-brand">
          Blue Devil Cafe Online
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
          </Link>
          </li>
          <li className="nav-item">
            <Link to={"/calendar"} className="nav-link">
              Calendar
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/cart"} className="nav-link">
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
          </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={"/home"} component={Home} />
          <Route exact path={"/calendar"} component={Calendar} />
          <Route exact path={"/cart"} component={Cart} />
          <Route
            exact path={"/login"}
            render={() => <Login handleLogonChange={this.handleLogonChange} />}
          />
        </Switch>
      </div>
    </div>
  );

  adminNav = () => (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/menus" className="navbar-brand">
          Blue Devil Cafe Online
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/menus"} className="nav-link">
              Menus
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addmenu"} className="nav-link">
              Add Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/menuitems"} className="nav-link">
              Menu Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addmenuitem"} className="nav-link">
              Add Menu Item
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/menuitems"]} component={MenuItemList} />
          <Route exact path="/addmenuitem" component={AddMenuItem} />
          <Route path="/menuitems/:id" component={MenuItem} />

          <Route exact path={"/menus"} component={MenuList} />
          <Route exact path="/addmenu" component={AddMenu} />
          <Route path="/menus/:id" component={Menu} />
        </Switch>
      </div>
    </div>
  );

  render() {
    return this.state.isLoggedIn ? <this.adminNav /> : <this.userNav />;
  }
}

export default App;
