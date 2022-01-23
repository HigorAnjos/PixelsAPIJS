import YOU_KEY_API from "./key.js"

const anyKey = (typeof YOU_KEY_API === 'string');

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

  let data = {};
  if (anyKey) {
    authentication.headers.Authorization = YOU_KEY_API;
    data = await fetch(url, authentication);
  } else {
    data =  await fetch(url);
    if (!data.ok) throw "API_PIXELS: Objeto de demonstracao esta indisponivel"
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
  try {
    await loadImg('people');
  } catch (err) {
    alert(err)
  }
}

window.addEventListener('scroll', async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight -5) {
    try {
      await loadImg('people', false);
    } catch (err) {
      alert(err)
    }
  }
})