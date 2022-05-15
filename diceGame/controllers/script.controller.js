const API = "http://localhost:3000/dicegame";
const APIBet = "http://localhost:3000/startGame";
const form = document.getElementsByTagName('form')[0];
const betform = document.getElementsByTagName('form1')[0];

//formulario para guardar los jugadores
form.addEventListener('submit', async function (event) {
    e.preventDefault();
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const player3 = document.getElementById('player3').value;
    const data = await createGame(player1, player2, player3);
})

//formulario para guardar las apuestas del juego
betform.addEventListener('submit', async function(event){
    event.preventDefault();
    const playerbet1 = document.getElementById('player1').value;
    const playerbet2 = document.getElementById('player2').value;
    const playerbet3 = document.getElementById('player3').value;
    const data = await getBet(playerbet1, playerbet2, playerbet3);
})

//funcion para guardar los jugadores en  la base de datos
const postdata = async (player1, player2, player3) => {
    const apiURl = `${API}`
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({
            players: [player1, player2, player3]
        })
    }
    //hacemos una peticion fetch 
    try {
        const response = await fetch(apiURI, options);
        const data = await response.json();
        console.log("la peticion fue satisfactoria")

        // return data;
    } catch (error) {
        console.log('Fetch Error', error);
    }
}

//funcion para ingresar la apuesta de los jugadores
const postBet = async (playerbet1,playerbet2,playerbet3)=>{
    const apiURl = `${APIBet}` //llama a la ruta de api de start game
    console.log(apiURl + "Correcto");
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({
            betPlayers:[playerbet1,playerbet2,playerbet3]
        })
    }
    try {
        const response = await fetch(apiURl,options);
        const data = await response.json();
        
        return data;
    }catch(error){
        console.log('Fetch Error', error);
    };
};