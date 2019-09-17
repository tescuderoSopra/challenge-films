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

export const saveNewFavouriteInStorage = (film) => {
    const myStorage = searchInStorage('films');
    if (myStorage && !myStorage.find(storage => storage.title === film.title)) {
        myStorage.push({
            ...film,
            isFavourite: true,
        })
    }
    writeInStorage('films', myStorage);
}


export const saveSearchInStorage = topic => {
    const myStorageTopics = searchInStorage('topics');
    if (myStorageTopics && !myStorageTopics.find(storageTopic => storageTopic.title === topic)) {
        myStorageTopics.unshift({ title: topic });
    }

    writeInStorage('topics', myStorageTopics);
    return myStorageTopics;
}

export const findFilmsInStorage = topic => {
    const myStorage = searchInStorage('films');
    if (myStorage) {
        return myStorage.filter(storage => storage.title.toLowerCase().indexOf(topic.toLowerCase()) > -1);
    }
    return [];
}

export const findFilmsFavouriteInStorage = () => {
    const myStorage = searchInStorage('films');
    if (myStorage) {
        return myStorage.filter(storage => storage.isFavourite);
    }
    return [];
}

export const findFilmById = id => {
    const myStorageFilms = searchInStorage('films');
    return myStorageFilms.find(storageFilm => storageFilm.id.toString() === id);
}


export const findAndModifyFilm = id => {
    const myStorageFilms = searchInStorage('films');
    const filmIndex = myStorageFilms.findIndex(storageFilm => storageFilm.id === id);
    myStorageFilms[filmIndex].isFavourite = !myStorageFilms[filmIndex].isFavourite;
    writeInStorage('films', myStorageFilms);
}


export const transformArrayFilmsSeries = (filmsAndSeries) => filmsAndSeries
    .filter(filmsAndSerie => filmsAndSerie.media_type === 'tv' || filmsAndSerie.media_type === 'movie')
    .map(filmAndSerie => ({
        ...filmAndSerie,
        title: filmAndSerie.title || filmAndSerie.name,
        mediaType: filmAndSerie.media_type,
    }));
export const tagRef = (html) => {
    const cache = new WeakMap();
    return (s, ...e) => {
        const tagIndex = (t, i) =>
            // checks for '*<' or '*</' and a valid tagname
            /[^>]*<\/?$/.test(t) && /[\w-]+/.test(e[i]) && i;
        const indices = s.map(tagIndex).filter(i => i !== false);
        if (indices.length === 0) return html.call(null, s, ...e);

        const isTagIndex = i => indices.indexOf(i) !== -1;

        let strings = cache.get(s);
        if (!strings) {
            strings = s.reduce(
                (acc, token, i) =>
                    isTagIndex(i - 1)
                        ? acc // if prev was tag skip token, it was joined below
                        : isTagIndex(i)
                            ? acc.concat([token, s[i + 1]].join(e[i]))
                            : acc.concat(token),
                []
            );
            cache.set(s, strings);
        }

        const exps = e.filter((_, i) => !isTagIndex(i));
        return html.call(null, strings, ...exps);
    };
}
