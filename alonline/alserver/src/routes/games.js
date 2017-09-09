import express from 'express';
import commonValidation from '../shared/validations/game';
import authenticate from '../middlewares/authenticate';
import isEmpty from 'lodash/isEmpty';
import Game from '../models/game';


let router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return Game.query({
    where: { title: data.title }
  }).fetch().then(game => {
    if (game) {
      if (game.get('title') === data.title) {
        errors.title = 'There is game with such title';
      }

    }

    return {
      errors,
      isValid: isEmpty(errors)
    };

  });

  /*
  //query database
  return Promise.all([
    User.where({ email: data.email }).fetch().then(user => {
      if (user) { errors.email = 'There is user with such email'; }
    }),
    User.where({ username: data.username }).fetch().then(user => {
      if (user) { errors.username = 'There is user with such username'; }
    })

  ]).then(() => {
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
  */
}

router.get('/', (req, res) => {
  //setTimeout(() => {
    Game.query({
      select: ['id', 'title', 'cover']
    }).fetchAll().then(game => {
      res.json( game );
    });

  //}, 2000);
});

router.put('/:id', (req, res) => {

  validateInput(req.body, commonValidation).then(({ errors, isValid }) => {
    if(isValid) {
      const { title, cover } = req.body;

      Game.forge().where({ id: req.body.id }).save({title, cover}, {method:"update"})
        .then(game => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json({ errors });
    }
  });
});

router.delete('/:id', (req, res) => {
  Game.query({
    where: { id: req.params.id }
  }).destroy()
  .then(id => res.json({ success: true }))
  .catch(err => res.status(500).json({ error: err }));

/*      new Game({ id: req.params.id }).destroy()
      .then(id => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));
*/
});

router.get('/:id', (req, res) => {
  //setTimeout(() => {
    Game.query({
      select: ['id', 'title', 'cover'],
      where: { id: req.params.id }
    }).fetch().then(game => {
      res.json( game );
    });

  //}, 2000);
});

router.post('/', (req, res) => {
  const { title, cover } = req.body;

  Game.forge({
    title, cover
  }, {hasTimestamps: true }).save()
    .then(game => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err }));
});

export default router;
