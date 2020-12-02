import React, { Component } from "react";
import MenuItemDataService from "../services/menu-item.service";

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.getMenuItem = this.getMenuItem.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);

    this.state = {
      currentMenuItem: {
        id: null,
        title: "",
        description: "",
        image: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMenuItem(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    //backup last title
    this.setState(function (prevState) {
      return {
        currentMenuItem: {
          ...prevState.currentMenuItem,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    //backup last description
    this.setState(prevState => ({
      currentMenuItem: {
        ...prevState.currentMenuItem,
        description: description
      }
    }));
  }

  onChangeImage(e) {
    const image = e.target.value;

    //backup last image
    this.setState(prevState => ({
      currentMenuItem: {
        ...prevState.currentMenuItem,
        image: image
      }
    }));
  }

  getMenuItem(id) {
    MenuItemDataService.get(id)
      .then(res => {
        this.setState({
          currentMenuItem: res.data
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMenuItem() {
    MenuItemDataService.update(
      this.state.currentMenuItem.id,
      this.state.currentMenuItem
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          message: "The menu item was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMenuItem() {
    MenuItemDataService.delete(this.state.currentMenuItem.id)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/menuitems')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMenuItem } = this.state;

    return (
      <div>
        {currentMenuItem ? (
          <div className="edit-form">
            <h4>Menu Item</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMenuItem.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMenuItem.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMenuItem.image}
                  onChange={this.onChangeImage}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMenuItem}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMenuItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a MenuItem...</p>
            </div>
          )}
      </div>
    )
  }
}