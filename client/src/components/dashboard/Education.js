import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

// Action imports
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const { education } = this.props;
    const edus = education.map(ed => (
      <tr key={ed._id}>
        <td>{ed.school}</td>
        <td>{ed.degree}</td>
        <td>{ed.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{ed.from}</Moment> -{" "}
          {ed.to === undefined ? (
            "Current"
          ) : (
            <Moment format="YYYY/MM/DD">{ed.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, ed._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{edus}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
  // profile: PropTypes.object.isRequired
};

// Isso vem do root reducer
// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });

export default connect(
  null,
  { deleteEducation }
)(Education);
