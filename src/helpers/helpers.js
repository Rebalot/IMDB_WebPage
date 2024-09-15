export function mezclarItems(object, noItems = null) {
    const extraerItems = Object.entries(object).map(([tipo, items]) => {
        return noItems ? items.slice(0, noItems) : items;
    });

    const maxLength = Math.max(
        ...extraerItems.map((items) => items.length)
    );

    const combined = [];
    for (let i = 0; i < maxLength; i++) {
        extraerItems.forEach((items) => {
            if (i < items.length) {
                combined.push(items[i]);
            }
        });
    }

    return combined;
}

export function mapData(data) {
    return data.map((item) => ({
      title: item.hasOwnProperty("title")
        ? item.title
        : item.name,
      rating: item.vote_average,
      imgUrl: `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`,
      releaseDate: item.hasOwnProperty("release_date")
        ? item.release_date
        : item.first_air_date,
      id: item.id,
      tipo: item.hasOwnProperty("title") ? "movie" : "tv",
    }));
};