console.log('Hello World!');

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const gameId = urlParams.get('gameId');
console.log(gameId);
