import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class TemplateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { title, errors, isLoading } = this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
        />

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

export default TemplateForm;
