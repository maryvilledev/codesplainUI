import React, { PropTypes } from 'react';

const AuthorIcon = ({ author }) => (
  <span>{author}</span>
);

AuthorIcon.propTypes = {
  author: PropTypes.string.isRequired,
};

export default AuthorIcon;
