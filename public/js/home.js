const main = document.querySelector('.main-view');
const inputPreview = document.querySelector("#direction");

//fetching the movie list from the api
fetch(genre_list_http + new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.genres.forEach(item => {
        // console.log(item.id);
        fetchMoviesListByGenres(item.id, item.name);
    });
})

//fetching the genre from the api
const  fetchMoviesListByGenres=(id,genre)=>{
    fetch(movies_genres_http + new URLSearchParams({
        api_key:api_key,
        with_genres:id,
        page:Math.floor(Math.random()*3) + 1
    }))
    .then(res=>res.json())
    .then(data=>{
        console.log(data.results.adult);
        makeCategoryElement(`${genre}_movies`, data.results);
        console.log(genre);
    })
    .catch(err =>console.log(err))
}


//fetching the categories and generating dynamic html
const makeCategoryElement=(category,data)=>{
    main.innerHTML+=`
    <div class="movie-list">
                <button class="pre-btn"><img src="./images/Forward.svg" alt=""></button>
                <h1 class="movie-category">${category.split('_').join(' ')}</h1>  
            <div class="movie-container" id=${category}>
              
            </div>
            <button class="nxt-btn"><img src="./images/Backward.svg" alt=""></button>
        </div>
    
    `
    makeCards(category,data)
}

const makeCards=(id,data)=>{
    const movieContainer=document.getElementById(id);
    data.forEach((item,id)=>{
        if(item.backdrop_path===null){
            item.backdrop_path=item.poster_path;
            if (item.backdrop_path===null){
                return;
            }
        }

        movieContainer.innerHTML+=`
          <div class="movie" onclick="location.href='/${item.id}'">
                <img src="${image_url}${item.backdrop_path}" alt="">
                 <p class="movie-title">${item.title}</p>
         </div>
        
        `
    })
}

 console.log(preview.innerHTML);
inputPreview.addEventListener('keyup', (e)=>{
             preview.innerHTML="Get Started"
    
})



const displayMe=()=>{
    // if (preview.innerHTML==="Get Started"){
    //     preview.innerHTML=""
    // }
}



const loadingFunction =()=>  {
    let timeline;
  timeline = setTimeout(showPage, 3000);
}

const showPage=()=> {
  document.getElementById("loader_display").style.display = "none";
  document.getElementById("netflix_main").style.display = "block";
}