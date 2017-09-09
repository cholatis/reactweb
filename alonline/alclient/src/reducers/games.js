import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from '../actions/types';



export default (state=[], action={}) => {
  switch (action.type) {
    case ADD_GAME:
      //...state is all item from current state
      return [
        ...state,
        action.game
      ];
    case GAME_FETCHED:
      const index = state.findIndex(item => item.id === action.game.id);
      console.log(index);
      console.log(action.game.id);
      //console.log(state);
      if(index > -1) {
        return state.map(item => {
          //console.log(action.game);
          if(item.id === action.game.id) return action.game;
          return item;
        });
      } else {
        return [
          ...state,
          action.game
        ];
      }
    case GAME_DELETED:
      return state.filter(item => item.id !== action.id);
    case GAME_UPDATED:
      return state.map(item => {
        //console.log(action.game);
        if(item.id === action.game.id) return action.game;
        return item;
      });
    case SET_GAMES:
      return action.games;
    default:
      return state;

  }
}
