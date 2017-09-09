import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveGame, fetchGame, updateGame } from '../../actions/gamesActions';
import TextFieldGroup from '../common/TextFieldGroup';

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
 let errors = {};

 if(Validator.isEmpty(data.title)) {
   errors.title = 'This field is required';

 }

 if(Validator.isEmpty(data.cover)) {
   errors.cover = 'This field is required';
 }

 return {
   errors,
   isValid: isEmpty(errors)
 };
}

class GamesForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('test' );
    this.setState({
      id: nextProps.game.id,
      title: nextProps.game.title,
      cover: nextProps.game.cover
    });
  }

  componentWillMount() {
    console.log('componentWillMount' );
    if(this.props.match.params.id) {
      this.props.fetchGame(this.props.match.params.id);
      console.log(this.props.match.params.id);
      if(this.props.game) {
        console.log('has game');
        this.setState({
          id: this.props.game.id,
          title: this.props.game.title,
          cover: this.props.game.cover
        });
      }

    }
  }

  componentDidMount() {
    console.log('componentDidMount' );
    /*if(this.props.match.params.id) {
      this.props.fetchGame(this.props.match.params.id);

    }
    */

//    this.setState({
//      title: this.props
//    });
//    console.log(this.props);
  }

  constructor(props) {
    super(props);
    this.state =  {
      id: null,
      title: '',
      cover: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  isValid() {
    const { errors, isValid } =  validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      if(this.state.id) {
        this.props.updateGame(this.state).then(
          (res) => this.context.router.history.push('/games'),
          (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
        );
      } else {
        this.props.saveGame(this.state).then(
          (res) => this.context.router.history.push('/games'),
          (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
        );

      }

    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { errors, title, cover, isLoading } = this.state;


    return(
      <div>
      <Link to="/games">&lt;&lt; Back</Link>
        <h1>THis is games form</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }


        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            field="title"
            label="Title"
            value={ title }
            error={errors.title}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="cover"
            label="Cover URL"
            value={ cover }
            error={errors.cover}
            onChange={this.onChange}
          />

          <div className="form-group">
            {cover !== '' && <img src={cover} alt="cover" className="" /> }
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-lg" disabled={isLoading}> Save </button>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  //console.log(props);
  //return { post: posts[ownProps.match.params.id] };
    if(props.match.params.id) {
      console.log(state);
      return {
        game: state.games[props.match.params.id-1] ? state.games[props.match.params.id-1] : state.games[0]
      }
    }
    return { game: null };
}



GamesForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GamesForm);
