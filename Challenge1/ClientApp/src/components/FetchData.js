import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/ProductsData";

class FetchData extends Component {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    this.props.requestProductsData();
  }

  renderProductTable() {
    const { data } = this.props;
    return (
      <div>
        <table className="table table-striped custom-style">
          <thead>
            <tr>
              <th>Id</th>
              <th className={"name-column"}>Name</th>
              <th className={"category-column"}>Category</th>
              <th>Active</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr
                className="product-table-row"
                key={item.id}
                onClick={() => routeChange(this.props, item.id)}
              >
                <td>{item.id}</td>
                <td className={"name-column"}>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.active ? "true" : "false"}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div className="d-flex flex-column flex-fill">
        <button
          className={"btn btn-primary custom-style shadowed mr-4"}
          onClick={() => routeChange(this.props, null)}
        >
          Create New Product
        </button>
        <div className="container">
          <h1 className={"custom-style"}>Produts List</h1>
          {this.renderProductTable()}
        </div>
      </div>
    );
  }
}

function routeChange(props, id) {
  const path = id ? `${id}/edit` : "/create";
  props.history.push(path);
}

export default connect(
  state => state.productsData,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
