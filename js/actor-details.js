
import {
    LoadData,
} from './load-data/load-api-data.js';

import {
    findGetParameter,
} from './app-common-functions/common-functions.js';


async function movieActorDetails(){
    const id = findGetParameter('id');
    // console.log(id);

    var actorData = new LoadData();

    if (id) {
        const actorDetails = await actorData.loadActorDetails(id);
        // console.log(actorDetails);

           // get template tag content and import it
           const template = document.getElementById("actor-details");
           const details = template.content.querySelector("div");
           const nodeActor = document.importNode(details, true);

           
        // find description of movie and append api overview into html
        const description = nodeActor.querySelector('.para-actor p');
        description.append(document.createTextNode(actorDetails.biography));


        var filmo = await actorData.loadActorFilmography(id);
        
        filmo = filmo.cast.map(item => {
            item.year = item.release_date ? parseInt(item.release_date.split('-')[0]) : '';
            return item;
        });

        filmo.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));

        let groupedFimlo = [];
        let years = [];

        for(var i = 0; i < filmo.length; i++){
            if(years.includes(filmo[i].year)){
                groupedFimlo.map(item => {
                    if(item.year == filmo[i].year)  item.films.push(filmo[i]);
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
        console.log(groupedFimlo);


        document.getElementById('actor-main-details').append(nodeActor);






    }
    
}
movieActorDetails();
