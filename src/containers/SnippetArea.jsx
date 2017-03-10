import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { CardText, TextField } from 'material-ui';

import {
  setAST,
  setRuleFilters,
  setSnippetContents,
  setSnippetTitle,
  toggleEditState,
} from '../actions/app';
import {
  openAnnotationPanel,
} from '../actions/annotation';

import Editor from '../components/Editor';
import SaveButton from '../components/SaveButton';

import ConfirmLockDialog from '../components/ConfirmLockDialog';
import LockButton from '../components/LockButton';

const style = {
  textField: {
    width: '400px',
    position: 'relative',
  },
  lockButton: {
    position: 'absolute',
  },
};

export class SnippetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lockDialogOpen: false,
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleParserRun = this.handleParserRun.bind(this);
    this.handleSaveState = this.handleSaveState.bind(this);
    this.handleSnippetChanged = this.handleSnippetChanged.bind(this);
    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.handleToggleReadOnly = this.handleToggleReadOnly.bind(this);
  }

  handleSnippetChanged(snippetContents) {
    const { dispatch } = this.props;
    dispatch(setSnippetContents(snippetContents));
  }

  handleTitleChanged(ev) {
    const snippetTitle = ev.target.value;
    const { dispatch } = this.props;
    dispatch(setSnippetTitle(snippetTitle));
  }

  handleLock() {
    this.setState({
      lockDialogOpen: true
    });
  }

  handleToggleReadOnly() {
    const { dispatch } = this.props;
    dispatch(toggleEditState());
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.setState({
      lockDialogOpen: false
    });
  }

  handleSaveState() {
    const obj = this.props.appState;
    const stateString = JSON.stringify(obj);
    return axios.post('/api/snippets/', { json : stateString });
  }

  handleGutterClick(lineNumber, lineText) {
    const { readOnly, dispatch } = this.props
    if (!readOnly) {
      return //Gutter clicks do nothing when not locked
    }

    dispatch(openAnnotationPanel({lineNumber, lineText}))
  }

  handleParserRun(AST, filters) {
    const { dispatch } = this.props
    dispatch(setAST(AST))
    dispatch(setRuleFilters(filters))
  }

  render(){
    const {
      annotations,
      AST,
      filters,
      openLine,
      readOnly,
      snippet,
      snippetTitle,
    } = this.props;
    const markedLines = Object.keys(annotations).map((key) => Number(key))
    return (
      <CardText>
        <TextField
          hintText="Snippet Name"
          value={snippetTitle}
          onChange={this.handleTitleChanged}
          style={style.textField}
        />
        <LockButton
          onClick={this.handleLock}
          readOnly={readOnly}
          style={style.lockButton}
        />
        <ConfirmLockDialog
          accept={this.handleToggleReadOnly}
          isOpen={this.state.lockDialogOpen}
          reject={this.handleCloseModal}
        />
        <Editor
          AST={AST}
          filters={filters}
          markedLines={markedLines}
          onChange={this.handleSnippetChanged}
          onGutterClick={this.handleGutterClick}
          onParserRun={this.handleParserRun}
          openLine={openLine}
          readOnly={readOnly}
          value={snippet}
        />
        <SaveButton
          onSaveClick={this.handleSaveState}
        />
      </CardText>
    );
  }
}

SnippetArea.propTypes = {
  annotations: PropTypes.object.isRequired,
  AST: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  openLine: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  snippet: PropTypes.string.isRequired,
  snippetTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  annotations: state.app.annotations,
  AST: state.app.AST,
  filters: state.app.filters,
  openLine: (state.annotation.isOpen
    ? state.annotation.snippetInformation.lineNumber
    : undefined),
  readOnly: state.app.readOnly,
  snippet: state.app.snippet,
  snippetTitle: state.app.snippetTitle,
  appState: state.app,
});

export default connect(mapStateToProps)(SnippetArea);
