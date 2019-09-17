export const searchInStorage = (storage) => {
    const itemStorage = window.localStorage.getItem(storage);
    if (itemStorage) {
        return JSON.parse(itemStorage);
    }
    return [];
};

export const writeInStorage = (storage, data) => window.localStorage.setItem(storage, JSON.stringify(data));

export const saveFilmsInStorage = (films) => {
    let myStorage = searchInStorage('films');
    if (myStorage) {
        films.forEach((film, index) => {
            const storageFilm = myStorage.find(storage => storage.title === film.title);
            if (!storageFilm) {
                myStorage = [...myStorage, film];
            } else {
                myStorage[index] = {
                    ...film,
                    ...myStorage[index]
                };
            }
        });
    } else {
        myStorage = films;
    }
    writeInStorage('films', myStorage);
}

export const transformArrayFilmsSeries = (filmsAndSeries) => filmsAndSeries
    .filter(filmsAndSerie => filmsAndSerie.media_type === 'tv' || filmsAndSerie.media_type === 'movie')
    .map(filmAndSerie => ({
        ...filmAndSerie,
        title: filmAndSerie.title || filmAndSerie.name,
        mediaType: filmAndSerie.media_type,
    }));

export const findFilmsInStorage = topic => {
    const myStorage = searchInStorage('films');
    if (myStorage) {
        return myStorage.filter(storage => storage.title.toLowerCase().indexOf(topic.toLowerCase()) > -1);
    }
    return [];
}