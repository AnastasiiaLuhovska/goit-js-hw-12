import { getData } from './js/pixabay-api.js';
import {  instance } from './js/render-functions.js';
import iziToast from "izitoast";
import {renderCards} from "./js/render-functions.js"



export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader')
}


const handleSubmit = (event) =>{
  event.preventDefault()

  const inputValue = event.target.elements['search-text'].value
  if (!inputValue.trim()) return

  event.target.reset()
  instance.show()

  getData(inputValue)
    .then(response => {
      if(response.data.hits.length === 0){
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      renderCards(response)

    })
    .catch(error => console.log(error.message))
    .finally(instance.close())
}

refs.form.addEventListener('submit', handleSubmit)

refs.loader.classList.add('hidden')