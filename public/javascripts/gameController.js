//varialbe passed from pug
console.log(gameIdToSet);

//get window query string
const queryString = window.location.search;
console.log(queryString);
//spin up an instance of URLSearchParams
const urlParams = new URLSearchParams(queryString);
//spin up another instance of URLSearchParams for updating URL
const params = new URLSearchParams(location.search);
//set the URL value gameId to the gameIdToSet
params.set('gameId', gameIdToSet);
//update the URL visibily 
window.history.replaceState({}, '', `${location.pathname}?${params}`);
//get the gameId again to confirm it's there
const gameId = urlParams.get('gameId');
console.log(gameId);
//refresh the page
location.reload();