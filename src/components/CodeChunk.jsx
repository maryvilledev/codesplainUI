import React from 'react'

/*const CodeChunk = ({concept, lang, color, children, onMouseEnter}) => {
  const style = {
    backgroundColor: color,
    padding: '2px',
  }  

  return (
    <span
      style={style}
      onMouseEnter={() => {
          onMouseEnter(lang, concept);
          style.fontWeight = 'bold';
        }
      }
      >{children}</span>
  );
}*/

class CodeChunk extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        backgroundColor: this.props.color,
        padding: '2px',
        paddingLeft: '0px',
        paddingRight: '0px',
      }
    }
    this.render = this.render.bind(this);
    this.setSelectedStyle = this.setSelectedStyle.bind(this);
    this.setUnselectedStyle = this.setUnselectedStyle.bind(this);
  }

  setSelectedStyle() {
    const style = this.state.style;
    style.fontWeight = 'bold';
    this.setState({style: style});
  }

  setUnselectedStyle() {
    const style = this.state.style;
    style.fontWeight = 'normal';
    this.setState({style: style});
  }

  render() {
    const {lang, concept, children, onMouseEnter} = this.props;
    return (
      <span
        style={this.state.style}
        onMouseEnter={() => {
          onMouseEnter(lang, concept);
          this.setSelectedStyle();
          }
        }
        onMouseLeave={this.setUnselectedStyle}
        >{children}</span>
    );
  }
}

CodeChunk.propTypes = {
  color: React.PropTypes.string,
  concept: React.PropTypes.string,
  lang: React.PropTypes.string,
  children: React.PropTypes.any,
  onMouseEnter: React.PropTypes.func,
}

export default CodeChunk;
