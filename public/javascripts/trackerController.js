console.log('Hello World!');
console.log(gameIdToSet);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

urlParams.set('gameId', gameIdToSet);

const gameId = urlParams.get('gameId');
console.log(gameId);

var url = window.location.href;
window.location.href = url;