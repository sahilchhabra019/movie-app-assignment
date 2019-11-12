import {
    LoadData
} from './load-data/load-api-data.js';
import {
    findGetParameter
} from './app-common-functions/common-functions.js';

async function movieActorDetails() {
    const id = findGetParameter('id');

    var actorData = new LoadData();
    if (id) {
        const actorDetails = await actorData.loadActorDetails(id);
        const template = document.getElementById("actor-details");
        const details = template.content.querySelector("div");
        const nodeActor = document.importNode(details, true);

        const description = nodeActor.querySelector('.para-actor p');
        description.append(document.createTextNode(actorDetails.biography));

        var filmo = await actorData.loadActorFilmography(id);
        filmo = filmo.cast.map(item => {
            item.year = item.release_date ? parseInt(item.release_date.split('-')[0]) : '';
            return item;
        });

        filmo.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));

        let groupedFimlo = [];
        let years = [];

        for (var i = 0; i < filmo.length; i++) {
            if (years.includes(filmo[i].year)) {
                groupedFimlo.map(item => {
                    if (item.year == filmo[i].year) item.films.push(filmo[i]);
                    else return item;
                });
            } else {
                years.push(filmo[i].year);
                groupedFimlo.push({
                    year: filmo[i].year,
                    films: [filmo[i]]
                })
            }
        }

        for (var i = 0; i < groupedFimlo.length; i++) {
            if (groupedFimlo[i].year) {
                const Movieyear = document.querySelector('.year');
                var h2 = document.createElement('h2');
                h2.append(document.createTextNode(groupedFimlo[i].year));
                Movieyear.append(h2);
                for (var j = 0; j < groupedFimlo[i].films.length; j++) {
                    const movieyeardata = document.querySelector('.year');

                    var article = document.createElement('article');
                    article.setAttribute("class", "data-years");
                    movieyeardata.append(article);

                    var h2 = document.createElement('h2');
                    h2.setAttribute("class", "years-text");
                    h2.append(document.createTextNode(groupedFimlo[i].films[j].title));
                    article.append(h2);

                }
            }
        }

        console.log(groupedFimlo);
        document.getElementById('actor-main-details').append(nodeActor);

    }

}
movieActorDetails();