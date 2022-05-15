const mongoose = require('mongoose');
const {v4: uuidv4 } = require('uuid');
const {Schema} = mongoose;


//Inicializo el esquema
const gameSchema = new Schema({
    id:{
        type: String,
        default: uuidv4()
    },
    players:{
        id:{
            type: String,
            default: uuidv4()
        },
        name:{
            type: String,
            trim: true
        }
    }

})

module.exports  = mongoose.model('dicegame', gameSchema)