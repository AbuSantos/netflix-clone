

let movie_id=location.pathname;
// console.log(movie_id);

fetch(`${movie_detail_http}${movie_id}?`+ new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    // console.log(data);
 setupMovieInfo(data)
})

const setupMovieInfo =(data)=>{
        let movieName=document.querySelector('.movie-name');
    let genres = document.querySelector('.genres');
    let genresDescription=document.querySelector('.genres-description');
    let starring = document.querySelector('.starring');
    let backDrop=document.querySelector('.movie-info');
    let title= document.querySelector('title')

    //adding the moviename as the title
    title.innerHTML=movieName.innerHTML=data.title;
    genres.innerHTML=`${data.release_date.split('-')[0]} |  `;
    for (let i=0; data.genres.length; i++){
        // console.log(data.genres[i].name);
       genres.innerHTML += data.genres[i].name  +  formatString(i, data.genres.length);
    }

        
    //checking if the movie is 18+ then adding the description to it
    if(data.adult==true){
        genres.innerHTML+=' | 18+'
    };

    //checking if theres an image from the api backdrop and if not
    //it makes the backdrop path == the poster path
    if(data.backdrop_path==null){
        data.backdrop_path=data.poster_path;
    }

    // genresDescription.innerHTML=data.overview.substring(0, 200) + '...';
    backDrop.style.backgroundImage=`url(${original_img_url}${data.backdrop_path})`;
    console.log(original_img_url, data.backdrop_path);
}

const formatString=(currentIndex, maxIndex)=>{
    return (currentIndex==maxIndex -1)? '':', '
}