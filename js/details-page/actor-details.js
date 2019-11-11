async function populateActorDetails() {
    const id = findGetParameter('id');
    // console.log(id);
    if (id) {
        const actorData = await getRelatedMovies(id);
        const movieList = document.getElementById('related-listing');
        createCard(movieData, movieList);
        addListeners(movieData, movieList);
    }
}