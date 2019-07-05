import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/ProductsData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { statusCodes } from "../constants";

class ProductCreating extends Component {
  state = {
    name: "",
    category: "",
    active: false,
    price: ""
  };

  componentDidUpdate() {
    const { response, clearResponse } = this.props;
    if (response) {
      if (response.errors || response.status === statusCodes.BAD_REQUEST) {
        toast.error("Oops, try again", {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        toast.success("Created Successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      clearResponse();
    }
  }

  createProduct() {
    this.props.createSingleProduct(this.state);
  }

  onChange = e => {
    if (e.target.type === "checkbox") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const { name, category, active, price } = this.state;
    return (
      <div className="container">
        <ToastContainer autoClose={3000} />
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Name:</span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="..."
              name="name"
              value={name}
              onChange={this.onChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Category:</span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="..."
              name="category"
              value={category}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue="Is active:"
              readOnly
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  name="active"
                  checked={active}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Price:</span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="..."
              name="price"
              value={price}
              onChange={this.onChange}
            />
          </div>
        </div>
        <button className={"btn btn-info"} onClick={() => this.createProduct()}>
          Create Product
        </button>
      </div>
    );
  }
}

export default connect(
  state => {
    return state.productsData;
  },
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ProductCreating);
