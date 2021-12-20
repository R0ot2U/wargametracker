console.log('Hello World!');
console.log(gameIdToSet);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

urlParams.append('gameId', {gameIdToSet});

const gameId = urlParams.get('gameId');
console.log(gameId);
