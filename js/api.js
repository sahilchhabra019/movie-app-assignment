function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const API_KEY = '9534ef382ae85c9a187075719f8e1961';
const ul = document.getElementById('movies');
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let movies = data.results;
  console.log(movies);
  return movies.map(function(movie) {
    let li = createNode('li'),
        img = createNode('img'),    
        span = createNode('span');
    img.src = movie.poster_path;
    span.innerHTML = `${movie.id}`;
    append(li, img);
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});   