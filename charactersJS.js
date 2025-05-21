const API_URL = "https://rickandmortyapi.com/api";

let isHide = true;
document.getElementById("containerHide").hidden = isHide;
document.getElementById("flyer").hidden = !isHide;

const slider = document.querySelector(".charactersList");

const prev = document.querySelector(".btnPrev")?.addEventListener("mouseup", ()=> {slider.scrollLeft -= 600});
const next = document.querySelector(".btnNext")?.addEventListener("mouseup", ()=> {slider.scrollLeft += 600});

let active = 0;

const initCharacters = async ()=> {

    try{
        const urlData = await axios(API_URL);
        apiInfo = urlData.data;
        
        const urlCharacters = await axios(apiInfo.characters);
        let dataList = urlCharacters.data.results;
        console.log(dataList)

        for (let i = 0; i < dataList.length; i++) {
        createSlot(i, dataList[i].name, dataList[i].image, dataList[i].gender, dataList[i].species, dataList[i].origin.name, dataList[i].location.name, dataList[i].status)   
        }
        document.querySelector(".charactersList").appendChild(fragmento);
        
    } catch(e){
        console.log("no se encontro " + e);
        
    }
}
const fragmento = document.createDocumentFragment();

function createSlot(id, name, image, gender, especie, origin, location, getStatus){
    let characterItem = document.createElement("DIV");
    characterItem.classList.add("characters_item");
    fragmento.appendChild(characterItem);

    let characterBg = document.createElement("DIV");
    characterBg.classList.add("character_bg");
    characterBg.id = id;
    characterItem.appendChild(characterBg);

    let characterBtn = document.createElement("BUTTON");
    characterBtn.classList.add("character_btn", "select_btn");
    characterBtn.addEventListener("click", ()=>{
        console.log(name);
        getInfo(name, image, gender, especie, origin, location, getStatus);
        document.getElementById(active).style.removeProperty("opacity");
        document.getElementById(id).style.opacity = 1;
        active = id;
    });

    characterBg.appendChild(characterBtn);

    let chName = document.createElement("b");
    chName.classList.add("chName");
    chName.innerHTML = name;
    characterItem.appendChild(chName);

    characterBg.style.backgroundImage = `url(${image})`;
}

function getInfo(name, image, gender, specie, origin, location, getStatus){
    document.querySelector(".name").textContent = name;
    document.getElementById("image_description").src = image;
    document.querySelector(".container_image").classList.add("container_imageSelect");
    document.querySelector(".gender").textContent = gender;
    document.querySelector(".specie").textContent = specie;
    document.querySelector(".origin").textContent = origin;
    document.querySelector(".location").textContent = location;
    document.querySelector(".getStatus").textContent = getStatus;

    isHide = false;
    document.getElementById("containerHide").hidden = isHide;
    document.getElementById("flyer").hidden = !isHide;


}

initCharacters();