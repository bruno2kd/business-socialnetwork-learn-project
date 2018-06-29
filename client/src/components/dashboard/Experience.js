import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

// Action imports
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const { experience } = this.props;
    const exps = experience.map(xp => (
      <tr key={xp._id}>
        <td>{xp.company}</td>
        <td>{xp.title}</td>
        <td>{xp.location}</td>
        <td>
          <Moment format="YYYY/MM/DD">{xp.from}</Moment> -{" "}
          {xp.to === undefined ? (
            "Current"
          ) : (
            <Moment format="YYYY/MM/DD">{xp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, xp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Location</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{exps}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
  // profile: PropTypes.object.isRequired
};

// Isso vem do root reducer
// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });

export default connect(
  null,
  { deleteExperience }
)(Experience);
