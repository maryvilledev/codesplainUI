import React, { PropTypes } from 'react';
import {
  Avatar,
} from 'material-ui';
import ReactTooltip from 'react-tooltip';

const styles = {
  avatar: {
    flexBasis: 'auto',
    margin: '3px 3px 3px 20px',
    paddingTop: '10px',
    verticalAlign: 'bottom',
  },
};

const AuthorAvatarIcon = ({ author, avatarUrl }) => {
  if (avatarUrl) {
    return (
      <div
        data-for="author-avatar"
        data-tip
        style={styles.avatar}
      >
        <Avatar
          size={20}
          src={avatarUrl}
        />
        <ReactTooltip
          id="avatar"
          effect="solid"
          place="bottom"
        >
          {author}
        </ReactTooltip>
      </div>
    );
  }
  return null;
};

AuthorAvatarIcon.propTypes = {
  author: PropTypes.string,
  avatarUrl: PropTypes.string,
};

AuthorAvatarIcon.defaultProps = {
  author: '',
  avatarUrl: '',
};

export default AuthorAvatarIcon;
