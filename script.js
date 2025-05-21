document.querySelector(".container_episodes").addEventListener("click", (e)=>{
    if(e.target && e.target.tagName === "BUTTON"){
        location.href="seasons.html"
    }
})