import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = props => {
  const { profile } = props;
  const skills = profile.skills.map((skill, index) => (
    <div className="p-3" key={index}>
      <i className="fa fa-check" /> {skill}
    </div>
  ));
  const name = profile.user.name.split(" ")[0];
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{name}'s Bio</h3>
          <p className="lead">{profile.bio}</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
