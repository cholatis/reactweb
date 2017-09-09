import axios from 'axios';
import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from './types';

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  };
}


export function addGame(game) {
  return {
    type: ADD_GAME,
    game
  }
}

export function gameFetched(game) {
  return {
    type: GAME_FETCHED,
    game
  };
}

export function gameUpdate(game) {
  return {
    type: GAME_UPDATED,
    game
  }
}

export function gameDeleted(gameId) {
  console.log('gameDeleted');
  return {
    type: GAME_DELETED,
    gameId
  }
}

export function saveGame(data) {
  console.log(data);
  return dispatch => {
    return axios.post('/api/games', data)
      .then(data => dispatch(addGame(data)));
  };
}

export function updateGame(data) {
  console.log(data);
  return dispatch => {
    return axios.put(`/api/games/${data.id}`, data)
      .then(data => dispatch(gameUpdate(data)));
  };
}

export function deleteGame(id, callback) {
  /*return dispatch => {
    return axios.delete(`/api/games/${id}`)
      .then(res => {
        console.log('delete');
        dispatch(gameDeleted(id));
      })
      .catch(err => console.log(err));
      console.log('deleteGame');
      return axios.delete(`/api/games/${id}`)
      .then(() => dispatch(gameDeleted(id)));
  };*/

  axios.delete(`/api/games/${id}`)
    .then(() => callback());

    return {
      type: GAME_DELETED,
      id
    }
}

export function fetchGames() {
  return dispatch => {
    return axios.get(`/api/games`)
      .then(res => {
        console.log(res);
        dispatch(setGames(res.data));
      });
  };
}

export function fetchGame(id) {
  return dispatch => {
    return axios.get(`/api/games/${id}`)
      .then(res => {
        console.log(res);
        dispatch(gameFetched(res.data));
      });
  };
}
