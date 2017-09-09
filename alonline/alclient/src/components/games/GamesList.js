import React from 'react';
import GameCard from './GameCard';
import { deleteGame } from '../../actions/gamesActions';

class GamesList extends React.Component {


  render() {
    const emptyMessage = (
      <p>There are no games yet in your collection.</p>
    );

    const gamesList = (
      //<p>games list</p>
      <div className="row">
        { this.props.games.map(game => <GameCard game={game} key={game.id} deleteGame={deleteGame} />)}
      </div>
    );

    return(
      <div>
      {
          this.props.games === 0 ? emptyMessage : gamesList
      }
      </div>
    );
  }
}


GamesList.propTypes = {
  games: React.PropTypes.array.isRequired,
  deleteGame: React.PropTypes.func.isRequired
}

export default GamesList;
