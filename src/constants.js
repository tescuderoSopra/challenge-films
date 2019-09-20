
const endpoints = {
    urlSearch: "search",
    urlTV: "tv",
    urlMovie: "movie",
    multi: "multi",
    APIkey: "96befef4ed5f899937a3ab357c0e2a4f",
}

const constants = {
    base: "https://api.themoviedb.org/3",
    urlImage: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
    lastSearchesNumber: 5,
    ...endpoints
};

const local = {
    base: 'localhost',
    APIkey: 'testAPI',
    ...endpoints
}
export default constants;

