import React from 'react';
import { Link } from 'react-router-dom';
import { deleteGame } from '../../actions/gamesActions';

class GameCard extends React.Component {

  onDeleteClick() {
    const { id } = this.props.game;

    this.props.deleteGame(id, () => {
      window.location.reload();
    });
  }

  render() {
    const { id, title, cover } = this.props.game;

    return(
      <div className="col-sm-4">
        <div className="bs-component">
          <div className="card">
            <div className="card-image">
              <img width="236px" height="236px" src={cover} alt="Game Cover" />
            </div>

            <div className="card-content">
              <div className="card-header">
                {title}
              </div>
            </div>
            <div className="card-extra card-content">
              <div className="row-fluid card-btn">
                <Link to={`/game/${id}`} className="col-xs-4 btn btn-inverted btn-primary">Edit</Link>
                <button className="col-xs-4 btn btn-inverted red" onClick={this.onDeleteClick.bind(this)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameCard.propTypes = {
  game: React.PropTypes.object.isRequired,
  deleteGame: React.PropTypes.func.isRequired
}

GameCard.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default GameCard;
