import React, { Component } from "react";
import MenuDataService from "../services/menu.service";
import moment from 'moment';
import DatePicker from 'react-date-picker';

export default class AddMenu extends Component {
  //define consttructor
  constructor(props) {
    super(props);

    //different events
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.saveMenu = this.saveMenu.bind(this);
    this.newMenu = this.newMenu.bind(this);

    //set initial state
    this.state = {
      id: null,
      title: "",
      date: moment().toDate(),
      date2: moment().format('YYYY-MM-DD'),
    };
  }

  //change state value
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  //change state value
  handleDateChange(date) {
    const tempDate = date;
    this.setState({
      date: tempDate,
      date2: moment(date).format('YYYY-MM-DD')
    });
    //console.log(date);
  }

  //save and create object with state values
  saveMenu() {
    var data = {
      title: this.state.title,
      date: this.state.date2
    };

    MenuDataService.create(data)
      .then(res => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          date: res.data.date
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //reset state
  newMenu() {
    this.setState({
      id: null,
      title: "",
      date: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMenu}>
              Add Menu
          </button>
          </div>
        ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <DatePicker
                  value={this.state.date}
                  onChange={this.handleDateChange}
                  name="date"
                  dateFormat="yyyy/mm/dd"
                />
              </div>

              <button onClick={this.saveMenu} className="btn btn-success">
                Submit
            </button>
            </div>
          )}
      </div>
    )
  }
}