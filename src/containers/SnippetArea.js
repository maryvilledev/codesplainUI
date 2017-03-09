import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { setSnippetContents, setSnippetTitle, toggleEditState} from '../actions/app'
import { openAnnotationPanel } from '../actions/annotation'

import Editor from '../components/Editor'
import SaveButton from '../components/SaveButton.jsx';
import TextField from 'material-ui/TextField';
import ConfirmLockDialog from '../components/ConfirmLockDialog';
import LockButton from '../components/LockButton';

class SnippetArea extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      lockDialogOpen: false
    }
    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.handleSnippetChanged = this.handleSnippetChanged.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleToggleReadOnly = this.handleToggleReadOnly.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSaveState = this.handleSaveState.bind(this);
    this.handleGutterClick = this.handleGutterClick.bind(this);
  }
  handleSnippetChanged(snippetContents) {
    const { dispatch } = this.props
    dispatch(setSnippetContents(snippetContents))
  }
  handleTitleChanged(ev) {
    const snippetTitle = ev.target.value
    const { dispatch } = this.props
    dispatch(setSnippetTitle(snippetTitle))
  }
  handleLock() {
    this.setState({
      lockDialogOpen: true
    })
  }
  handleToggleReadOnly() {
    const { dispatch } = this.props
    dispatch(toggleEditState())
    this.handleCloseModal()
  }
  handleCloseModal() {
    this.setState({
      lockDialogOpen: false
    })
  }
  handleSaveState() {
    const obj = this.props.appState
    const stateString = JSON.stringify(obj);
    return axios.post('/api/snippets/', { json : stateString });
  }
  handleGutterClick(lineNumber, lineText) {
    const { readOnly, dispatch } = this.props
    if (!readOnly) return //Gutter clicks do nothing when not locked
    dispatch(openAnnotationPanel({lineNumber, lineText}))
  }
  render(){
    const { readOnly, snippetTitle, annotations } =  this.props
    const markedLines = Object.keys(annotations).map((key) => Number(key))
    return (
      <div>
        <TextField
          hintText="Snippet Name"
          value={snippetTitle}
          onChange={this.handleTitleChanged}
        />
        <LockButton
          onClick={this.handleLock}
          readOnly={readOnly}
        />
        <ConfirmLockDialog
          accept={this.handleToggleReadOnly}
          isOpen={this.state.lockDialogOpen}
          reject={this.handleCloseModal}
        />
        <Editor
          readOnly={readOnly}
          onChange={this.handleSnippetChanged}
          onGutterClick={this.handleGutterClick}
          markedLines={markedLines}
        />
        <SaveButton
          onSaveClick={this.handleSaveState}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  readOnly: state.app.readOnly,
  snippetTitle: state.app.snippetTitle,
  annotations: state.app.annotations,
  appState: state.app
})

export default connect(mapStateToProps)(SnippetArea)
