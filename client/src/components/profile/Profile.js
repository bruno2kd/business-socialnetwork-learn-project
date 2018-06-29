import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components Imports
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import NotFound from "../not-found/NotFound";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.setState({
        notFound: true
      });
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { notFound } = this.state;
    let profileContent;
    if (profile === null || loading) {
      profileContent = notFound ? <NotFound /> : <Spinner />;
    } else {
      profileContent = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <Link
                    to="/profiles"
                    className="btn btn-light mb-3 float-left"
                  >
                    Back To Profiles
                  </Link>
                </div>
                <div className="col-6" />
              </div>
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds
                experience={profile.experience}
                education={profile.education}
              />
              {profile.github ? (
                <ProfileGithub username={profile.github} />
              ) : (
                undefined
              )}
            </div>
          </div>
        </div>
      );
    }

    return <div className="profile">{profileContent}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

// Isso vem do root reducer
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
