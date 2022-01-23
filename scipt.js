import YOU_KEY_API from "./key.js"

const input = document.getElementById('input');
const [grid] = document.getElementsByClassName('grid');

input.addEventListener('keydown', function(event) {
  if(event.key === 'Enter') loadImg(input.value, true);
});

async function loadImg (value = 'people', clear) {
  if(clear) removeImages();

  let url =  `https://api.pexels.com/v1/search?query=${value}?page=10&per_page=40`;
  
  let authentication = {
    headers: {
      Authorization: ''
    }
  }

  console.log('KEY',YOU_KEY_API)

  let data = {};
  if (YOU_KEY_API) {
    console.log("atenticacao")
    authentication.headers.Authorization = YOU_KEY_API;
    data = await fetch(url, authentication);
  } else {
    console.log("SEM atenticacao")
    data =  await fetch(url);
  }
  

  const response = await data.json();

  const imageNodes = []
  for (let i = 0; i < response.photos.length; i++) {
    imageNodes[i]  = document.createElement('img');
    imageNodes[i].className = 'img';
    imageNodes[i].src = response.photos[i].src.medium;
    imageNodes[i].addEventListener('dblclick', () => {
      window.open(response.photos[i].src.original, '_blank');
    })
    grid.appendChild(imageNodes[i]);
  }
}

function removeImages() {
  grid.innerHTML = '';
}

function dayNightMode() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 7 && hour <= 19) {
    document.body.style.backgroundColor = 'whitesmoke';
    document.body.style.color = 'black';
  } else {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }
}
window.addEventListener('load', dayNightMode);

window.onload = async () => {
  await loadImg('people');
}

window.addEventListener('scroll', async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight -5) {
    await loadImg('people', false);
  }
})