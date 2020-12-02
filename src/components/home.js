import React, { Component } from "react";
import moment from 'moment';
import './home.css'
import MenuDataService from "../services/menu.service"

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.retrievePopularMenu = this.retrievePopularMenu.bind(this);
    this.retrieveEverydayMenu = this.retrieveEverydayMenu.bind(this);
    this.retrieveSpecialMenu = this.retrieveSpecialMenu.bind(this);

    this.state = {
      popularitems: [],
      everydayitems: [],
      specialitems: [],
      date: moment().format('YYYY-MM-DD'),
    }
  }

  componentDidMount() {
    this.retrievePopularMenu();
    this.retrieveEverydayMenu();
    this.retrieveSpecialMenu();
  }

  retrievePopularMenu() {
    MenuDataService.get(1)
      .then(res => {
        this.setState({
          popularitems: res.data.menuItems,
        })
        //console.log(this.state.popularitems);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveEverydayMenu() {
    MenuDataService.get(2)
      .then(res => {
        this.setState({
          everydayitems: res.data.menuItems,
        })
        //console.log(res.data.menuItems);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveSpecialMenu() {
    MenuDataService.findByDate(this.state.date)
      .then(res => {
        this.setState({
          specialitems: res.data.menuItems,
        })
        //console.log(res.data.menuItems);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const popularitems = this.state.popularitems;
    const everydayitems = this.state.everydayitems;
    const specialitems = this.state.specialitems;

    return (
      <div className="col">

        <div className="col">
          <h3>Popular Items</h3>
          <ul className="row " style={{flexDirection: 'row'}}>
            {popularitems &&
              popularitems.map((menuitem, index) => (
                <div key={index} style={{flex: 1, }}>
                  <li className="row list-group-item" >
                    {menuitem.title}
                  </li>
                </div>
              ))
            }
          </ul>
        </div>

        <div className="col">
          <h3>Everyday Items</h3>
          <ul className="row " style={{flexDirection: 'row'}}>
            {everydayitems &&
              everydayitems.map((menuitem, index) => (
                <div key={index} style={{flex: 1, }}>
                  <li className="row list-group-item" >
                    {menuitem.title}
                  </li>
                </div>
              ))
            }
          </ul>
        </div>

        <div className="col">
          <h3>Special Items</h3>
          <ul className="row " style={{flexDirection: 'row'}}>
            {specialitems &&
              specialitems.map((menuitem, index) => (
                <div key={index} style={{flex: 1, }}>
                  <li className="row list-group-item" >
                    {menuitem.title}
                  </li>
                </div>
              ))
            }
          </ul>
        </div>

      </div>
    )
  }
}