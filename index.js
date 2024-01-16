const inputElement = document.getElementById('input');
const infoTxt = document.getElementById('info-text');
const meaningElement = document.getElementById('meaning-container');
const titleElement = document.getElementById('tittle');
const meaningEl = document.getElementById('meaning');
const audioElement = document.getElementById('myaudio');

  async function fetchAPI(word){
    
try {
    

    infoTxt.style.display = "block";
    meaningElement.style.display = "none";
    audioElement.style.display = "block";
    infoTxt.innerText = `searching the meaning of "${word}"`;
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const response = await fetch(URL).then((res) => res.json());

    if (response.title) {
        meaningElement.style.display = "block";
        infoTxt.style.display = "none";
        titleElement.innerText = word;
        meaningEl.innerText = `No definition found for the word`;
        audioElement.style.display = 'none';

    } else {
       infoTxt.style.display = "none";
    meaningElement.style.display = "block";
    audioElement.style.display = "inline-flex";
    titleElement.innerText = response[0].word;
    meaningEl.innerText = response[0].meanings[0].definitions[0].definition;
    audioElement.src = response[0].phonetics[0].audio; 
    }
    
} catch (error) {
    console.log(error);
    infoTxt.innerText = `An error occurred, try again later`;
  }
  };


inputElement.addEventListener('keydown', (e)=>{
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    };
})