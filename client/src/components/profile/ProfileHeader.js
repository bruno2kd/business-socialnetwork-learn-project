import React from "react";
import PropTypes from "prop-types";

const ProfileHeader = props => {
  const { profile } = props;
  const { social } = profile;
  const website = profile.website ? (
    <a target="_blank" className="text-white p-2" href={profile.website}>
      <i className="fas fa-globe fa-2x" />
    </a>
  ) : (
    undefined
  );
  const socialTwitter =
    social && profile.social.twitter ? (
      <a
        target="_blank"
        className="text-white p-2"
        href={profile.social.twitter}
      >
        <i className="fab fa-twitter fa-2x" />
      </a>
    ) : (
      undefined
    );
  const socialFacebook =
    social && profile.social.facebook ? (
      <a
        target="_blank"
        className="text-white p-2"
        href={profile.social.facebook}
      >
        <i className="fab fa-facebook fa-2x" />
      </a>
    ) : (
      undefined
    );
  const socialLinkedIn =
    social && profile.social.linkedin ? (
      <a
        target="_blank"
        className="text-white p-2"
        href={profile.social.linkedin}
      >
        <i className="fab fa-linkedin fa-2x" />
      </a>
    ) : (
      undefined
    );
  const socialInstagram =
    social && profile.social.instagram ? (
      <a
        target="_blank"
        className="text-white p-2"
        href={profile.social.instagram}
      >
        <i className="fab fa-instagram fa-2x" />
      </a>
    ) : (
      undefined
    );
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}{" "}
              {profile.company ? <span>at {profile.company}</span> : undefined}
            </p>
            <p>{profile.location}</p>
            <p>
              {website}
              {socialTwitter}
              {socialFacebook}
              {socialLinkedIn}
              {socialInstagram}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
