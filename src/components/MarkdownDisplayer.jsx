import React, { PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { Card } from 'material-ui';

import markdownRendererOptions from '../util/markdown-renderer-options';

const styles = {
  card: {
    padding: '0.5rem',
  },
};

const MarkdownDisplayer = ({ annotation }) => (
  <Card style={styles.card} >
    <MarkdownRenderer
      markdown={annotation}
      options={markdownRendererOptions}
    />
  </Card>
);

MarkdownDisplayer.propTypes = {
  annotation: PropTypes.string.isRequired,
};

export default MarkdownDisplayer;
