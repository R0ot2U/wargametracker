console.log('Hello World!');
console.log(gameIdToSet);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const params = new URLSearchParams(location.search);
params.set('gameId', gameIdToSet);

window.history.replaceState({}, '', `${location.pathname}?${params}`);

const gameId = urlParams.get('gameId');
console.log(gameId);