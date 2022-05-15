const GameModel = require('../models/game.model');
const { uuid } = require('uuidv4');
//const res = require('express/lib/response');


//funcion para ver crear el juego, teniendo en cuenta solo 3 jugadores
exports.creategame = function(req, res){
    try{
        //llamamos del modelo de la base de datos a los players(jugadores)
        const{players}=req.model;
        const gamemodel =  new GameModel({
            players:[{
                id:uuid(),
                name:players[0],
            },{
                id:uuid(),
                name:players[1]
            },{
                id:uuid(),
                name:players[2],
            }]
        })
        gamemodel.save()
            .then((result)=>res.json({
                id:result.id,
                type:"",
                players:[players[0], players[1], players[2]]
            }))
            .catch((err)=> console.log(err));
    }
    catch(err){
        console.log(err);
        console.log("Algo no salió bien ")
    }
    
};

//funcion para ver el estado del juego
exports.gameStatus=function(req,res){
    const {gameid}=req.params;
    //se consulta por el id del juego
    GameModel.findOne({gameid})  
        .then(result=>{ res.json({
            id: result.id,
            players: {
                id1: {
                    id: result.players[0].id,
                    name: result.players[0].name
                },
                id2: {
                    id: result.players[1].id,
                    name: result.players[1].name
                },
                id3: {
                    id: result.players[2].id,
                    name: result.players[2].name
                },
            },
            inProgress: false,
            //mostrar el ganador
            winner: {
                id: result.players[1].id,
                name: result.players[1].name
            }
        })
        })
        .catch(err=>console.log(err));
        console.log("Algo salió mal consultando el estado del juego")
}

//funcion para empezar juego con las apuestas de los jugadores
exports.startGame=function(req,res){
    const {betGamers}=req.body;
    const {gameid}=req.params;
    GameModel.findOne(gameid)
        .then(result=>{
            let obj={};
            obj[result.players[0].id]=betPlayers[0];
            obj[result.players[1].id]=betPlayers[1];
            obj[result.players[2].id]=betPlayers[2];
        
            res.json({
                id:uuid(),
                type:"" ,
                playerbet:obj
            })
        })
        .catch(err=>console.log(err));
        console.log("Algo salió mal empezando el juego");
}

//funcion para definir quien es el ganador del juego
exports.winner=function(req,res){
    const {gameid}=req.params;
    GameModel.findOne(gameid)
        .then(result=>{
            let winner=Math.floor(Math.random() * 4);
            res.json({
                id:result.players[winner].id,
                name:result.players[winner].name,
            })
        })
        .catch(err=>{
            console.log(err)
            console.log("¡Que mal! no se ha podido encontrar el juego")
        });
}