import React from 'react';
import { CircularProgress } from 'material-ui'

const styles = {
  centered: {
    color: '#a6a6a6',
    fontSize: '15pt',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-50px',
  },
}

/*
<Loading /> renders as a <CircularProgress /> in the center of the screen with
the text passed in with the 'text' prop displayed above it.
*/
const Loading = ({ text }) => (
  <div style={styles.centered}>
    <p>{text}</p>
    <CircularProgress 
      size={100} 
      thickness={7} 
    />
  </div>
);

export default Loading