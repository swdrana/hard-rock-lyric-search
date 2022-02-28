const searchKey = document.getElementById('search-key');
const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click',function(){
    searchSong(searchKey.value);
    searchKey.value='';
});
const searchSong = (key)=>{
    document.querySelector('.single-lyrics').innerText='';
    if(key!=''){
        fetch(`https://api.lyrics.ovh/suggest/${key}`)
        .then(res => res.json())
        .then(data => displaySongInfo(data))
    }else{
        document.querySelector('.single-lyrics').innerText='Something Went Wrong!! Please try again later!';
    }
}
const displaySongInfo = (keys)=>{
    document.querySelector('.search-result').innerHTML='';
    for(const key of keys.data){
        let div = document.createElement('div');
        div.classList.add('single-result', 'row',   'align-items-center', 'my-3', 'p-3');
        div.innerHTML=`
        <div class="col-md-9">
            <h3 class="lyrics-name">${key.title}</h3>
            <p class="author lead">Album by <span>${key.artist.name}</span></p>
            <audio controls>
                <source src="${key.preview}" type="audio/mpeg">
            <audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" onclick="showLyrics('${key.artist.name}', '${key.title}')">Get Lyrics</    button>
        </div>
        `;
        document.querySelector('.search-result').appendChild(div);
    }
}
function showLyrics(name, title){
    document.querySelector('.single-lyrics').innerText='Loading...';
    fetch(`https://api.lyrics.ovh/v1/${name}/${title}`)
        .then(res => res?.json()).then(data=>{
            document.querySelector('.single-lyrics').innerText=`${data.lyrics ? data.lyrics: data.error}`;
            console.log();
        });
}