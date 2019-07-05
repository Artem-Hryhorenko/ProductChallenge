import React, { Component, Fragment } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/ProductsData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isEqual from "lodash.isequal";

class ProductEditing extends Component {
  state = {
    product: { id: "", name: "", category: "", active: "", price: "" },
    isSaved: true
  };
  componentDidMount() {
    this.ensureDataFetched();
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.singleData, prevProps.singleData) ||
      !this.state.isSaved
    ) {
      this.setState(() => ({
        product: { ...this.props.singleData },
        isSaved: true
      }));
    }
    const { response, clearResponse } = this.props;
    if (response) {
      if (!response.success) {
        toast.error("Oops, try again", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.ensureDataFetched();
        this.setState(() => ({ isSaved: false }));
      } else {
        toast.success("Created Successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      clearResponse();
    }
  }

  ensureDataFetched() {
    this.props.requestSingleProduct(this.props.match.params.id);
  }

  updateData() {
    this.props.updateSingleProduct(this.state.product);
  }

  onChange = e => {
    const { target } = e;
    if (target.type === "checkbox") {
      this.setState(state => ({
        product: { ...state.product, [target.name]: target.checked }
      }));
    } else {
      this.setState(state => ({
        product: { ...state.product, [target.name]: target.value }
      }));
    }
  };

  render() {
    const { isLoading } = this.props;
    const { id, name, category, active, price } = this.state.product;
    return (
      <Fragment>
        <ToastContainer autoClose={3000} />
        {isLoading ? (
          <span className={"display-1 loading"}>Loading...</span>
        ) : (
          <div className="container">
            <div>
              <h3 className="product-title">{`Product ID: ${id}`}</h3>
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
            <button
              className={"btn btn-info"}
              onClick={() => this.updateData()}
            >
              Save changes
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(
  state => {
    return state.productsData;
  },
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ProductEditing);
