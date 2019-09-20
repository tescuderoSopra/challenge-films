
const isDebug = window.mode === 'development';

let endpoints = {
    urlSearch: "search",
    urlTV: "tv",
    urlMovie: "movie",
    multi: "multi",
}

const remote = {
    base: "https://api.themoviedb.org/3",
    urlImage: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
    lastSearchesNumber: 5,
    APIkey: "96befef4ed5f899937a3ab357c0e2a4f",
    ...endpoints
};

const local = {
    base: 'http://localhost:3000',
    APIkey: 'testAPI',
    ...endpoints
}

if(isDebug) {
    endpoints = { ...endpoints, ...local };
} else {
    endpoints = { ...endpoints, ...remote };
}
console.log(endpoints);

export default endpoints;

