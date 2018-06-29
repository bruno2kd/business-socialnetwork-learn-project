import React, { Component } from "react";
import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

// Actios imports
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
// Components imports
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
      // Check if logged in user has profile data
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profiles/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          {/* TODO: experience and Education */}
          <div style={{ marginBotton: "60px" }} />
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger"
          >
            {" "}
            Delete My Account
          </button>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name} </p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

// Isso vem do root reducer
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
