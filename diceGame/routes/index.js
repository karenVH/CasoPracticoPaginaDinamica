const express = require('express');
const router = express.Router();
const gameController=require('../controllers/game.controller')

/* GET Inicio */
router.get('/', function(req, res, next){
  res.render('index');
});

/** GET para obtener la vista de crear juego */
router.get('/creategame', function(req, res, next){
  res.render('creategame');
});
  
/**GET para obtener la vista de empezar juego */
router.get('/startgame', function(req, res, next){
  res.render('startgame');
});

/**GET ruta para el formulario de apuestas */
router.get('/', (req, res)=>{
  res.render('betForm');
})

/**GET para traer el id del juego y el estado */
//router.get('/:id', gameController.gameStatus);

/**GET para traer por id al gandor */
router.get('/:id/winner', gameController.winner);

/**POST para crear juego guardando datos en la base de datos */
router.post('/creategame', gameController.creategame);

/**POST para empezar el juego y traer el nombre de los jugadores */
router.post('/', gameController.startGame);


module.exports = router;
