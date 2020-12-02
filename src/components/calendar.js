import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import moment from 'moment';

import MenuDataService from "../services/menu.service"


export default class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: moment().toDate(),
      date2: moment().format('YYYY-MM-DD'),
      //default values get overridden
      menus: [{
        id: 999,
        date: "2020-11-29",
        menuItems: [],
        title: "Sunny Sunday Default"
      },]
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getMenusByDate = this.getMenusByDate.bind(this);
  }

  handleDateChange(date) {
    const tempDate = date;
    this.setState({
      date: tempDate,
      date2: moment(date).format('YYYY-MM-DD')
    });
    //console.log(date);
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.date);
    this.getMenusByDate(this.state.date2);
    //console.log(this.state.menus)
  }

  getMenusByDate(date) {
    console.log(this.state.date2);

    MenuDataService.findByDate(this.state.date2)
      .then(res => {
        this.setState({
          menus: res.data
        });
        //console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const menuitems = this.state.menus.menuItems;
   // console.log(this.state.menus.menuItems)
    const date = moment(this.state.date).format('LL');

    return (
      <div className="list row">
        <div className="col-md-8">
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <DatePicker
                value={this.state.date}
                onChange={this.handleDateChange}
                name="date"
                dateFormat="yyyy/mm/dd"
              />
              <button className="btn btn-primary">Show Items</button>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <h4>Items for {date}</h4>
          <ul className="list-group">
            {menuitems &&
              menuitems.map((menuitem, index) => (
                <div className="row" width="70%">
                  <li className="col-8 list-group-item" key={index} >
                    {menuitem.title}
                  </li>
                </div>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}