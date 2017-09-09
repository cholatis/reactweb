import React from 'react';
import GamesList from './GamesList';
import GamesForm from './GamesForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames, deleteGame } from '../../actions/gamesActions';


class GamesPage extends React.Component {
  componentDidMount() {
    this.props.fetchGames();
  }
  render() {

    return(
      <div>
      <Link to="/gamesform">Add new game</Link>
        <h1>Games List</h1>


        <GamesList games={ this.props.games} deleteGame={this.props.deleteGame} />
      </div>
    );
  }
}

GamesPage.propTypes = {
  games: React.PropTypes.array.isRequired,
  fetchGames: React.PropTypes.func.isRequired,
  deleteGame: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps, { fetchGames, deleteGame })(GamesPage);
