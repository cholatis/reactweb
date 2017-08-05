import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = { comment: '', commenterror: 'Please enter textbox' };
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
    if(event.target.value) {
      this.setState({ commenterror: '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.saveComment(this.state.comment);
    this.setState({ comment: '', commenterror: 'Please enter textbox' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="comment-box">
        <h4>Add a comment</h4>
        <textarea
          value={this.state.comment}
          onChange={this.handleChange.bind(this)} />
          <div className="text-help">{this.state.commenterror}</div>
        <div>
          <button action="submit">Submit Comment</button>
        </div>
      </form>
    );
  }
}



export default connect(null, actions)(CommentBox);
