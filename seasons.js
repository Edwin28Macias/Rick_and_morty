const API_URL = "https://rickandmortyapi.com/api";

btnSeasons = document.querySelectorAll(".season_manager");
btnSeason = document.querySelector(".seasons");

const fragment = document.createDocumentFragment()

const initSeasons = async ()=> {

    try{
        const urlData = await axios(API_URL);
        apiInfo = urlData.data;
        
        const urlEpisodes = await axios(apiInfo.episodes)
        let epList1 = urlEpisodes.data.results;
        console.log(urlEpisodes.data);

        const urlEpisodes2 = await axios(`${apiInfo.episodes}?page=2`)
        let epList2 = urlEpisodes2.data.results;
        console.log(urlEpisodes2.data);

        const urlEpisodes3 = await axios(`${apiInfo.episodes}?page=3`)
        let epList3 = urlEpisodes3.data.results;
        console.log(urlEpisodes3.data);

        for (let i = 0; i < 11; i++) {
            createEpisode(i + 1, epList1[i].name, epList1[i].air_date)  
            }
            document.querySelector(".season_l1").appendChild(fragment);

        for (let i = 11; i < 20; i++) {
            createEpisode(i - 10, epList1[i].name, epList1[i].air_date)  
            }
        createEpisode(10, epList2[0].name,epList2[0].air_date)
        document.querySelector(".season_l2").appendChild(fragment);

        for (let i = 1; i < 11; i++) {
            createEpisode(i, epList2[i].name, epList2[i].air_date)  
            }
            document.querySelector(".season_l3").appendChild(fragment);

        for (let i = 11; i < 20; i++) {
            createEpisode(i - 10, epList2[i].name, epList2[i].air_date)  
            }
        createEpisode(10, epList3[0].name,epList3[0].air_date)
        document.querySelector(".season_l4").appendChild(fragment);

        for (let i = 1; i < 11; i++) {
            createEpisode(i, epList3[i].name, epList3[i].air_date)  
            }
            document.querySelector(".season_l5").appendChild(fragment);
        


        
    } catch(e){
        console.log("no se encontro " + e);
        
    }
}
//https://rickandmortyapi.com/api/episode
btnActivator = ()=> {
    btnSeason.addEventListener("click", (e)=>{
        if(e.target && e.target.tagName === "BUTTON"){
            let height = 44;
                if(e.target.parentElement.clientHeight == "44") height= e.target.parentElement.scrollHeight;
                
                e.target.parentElement.style.height = `${height}px`;
        }
    })
}

function createEpisode(chapterNumber, name, air_date){
    let episodeItem = document.createElement("LI");
    episodeItem.classList.add("episode");

    let epName = document.createElement("p");
    epName.innerHTML = 
    `
        <b >Chapter ${chapterNumber}:</b> "${name}"<br>
        <b >Air date:</b> <span style="color:red">${air_date}</span>
    `;
    episodeItem.appendChild(epName);
    fragment.appendChild(episodeItem);

}

initSeasons();
btnActivator();

