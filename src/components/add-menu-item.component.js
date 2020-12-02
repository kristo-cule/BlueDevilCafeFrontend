import React, { Component } from "react";
import MenuItemDataService from "../services/menu-item.service";

export default class AddMenuItem extends Component {
  //define consttructor
  constructor(props) {
    super(props);

    //different events
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.saveMenuItem = this.saveMenuItem.bind(this);
    this.newMenuItem = this.newMenuItem.bind(this);

    //set initial state
    this.state = {
      id: null,
      title: "",
      description: "",
      image: ""
    };
  }
  //change state value
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  //change state value
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  //change state value
  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
  }
  //save and create object with state values
  saveMenuItem() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image
    };

    MenuItemDataService.create(data)
      .then(res => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          image: res.data.image
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  //reset state
  newMenuItem() {
    this.setState({
      id: null,
      title: "",
      description: "",
      image: ""
    });
  }

  render() {

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMenuItem}>
              Add Menu Item
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
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  required
                  value={this.state.image}
                  onChange={this.onChangeImage}
                  name="image"
                />
              </div>

              <button onClick={this.saveMenuItem} className="btn btn-success">
                Submit
            </button>
            </div>
          )}
      </div>
    )
  }
}