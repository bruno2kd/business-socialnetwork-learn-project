import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileCreds = props => {
  const { experience, education } = props;
  const experiences = experience.map(xp => (
    <li className="list-group-item" key={xp._id}>
      <h4>{xp.company}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{xp.from}</Moment> -{" "}
        {xp.to === undefined ? (
          "Current"
        ) : (
          <Moment format="YYYY/MM/DD">{xp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position:</strong> {xp.title}
      </p>
      <p>
        <strong>Location: </strong>
        {xp.location}
      </p>
      <p>
        <strong>Description: </strong>
        {xp.description}
      </p>
    </li>
  ));

  const schools = education.map(edu => (
    <li className="list-group-item" key={edu._id}>
      <h4>{edu.school}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === undefined ? (
          "Current"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {edu.fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong> {edu.description}
      </p>
    </li>
  ));
  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">{experiences}</ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">{schools}</ul>
      </div>
    </div>
  );
};

ProfileCreds.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileCreds;
