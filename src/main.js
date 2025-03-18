import { getData } from './js/pixabay-api.js';
import {  instance } from './js/render-functions.js';
import iziToast from "izitoast";
import {renderCards} from "./js/render-functions.js"



export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  button: document.querySelector('.load-more')
}

let page = 1;
let inputValue = '';
let totalItems;
let totalPages;

const handleSubmit = async (event) =>{
  event.preventDefault()

  inputValue = event.target.elements['search-text'].value.trim()
  if (!inputValue) return

  event.target.reset()
  instance.show()

  page = 1;
  refs.gallery.innerHTML = ''

  try{
    const {hits, total} = await getData(inputValue, page)
    totalItems = total
    totalPages = Math.ceil((totalItems/15))


    if(hits.length === 0){
      refs.button.classList.add('is-hidden')
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return
    }

    renderCards(hits)
    refs.button.classList.remove('is-hidden')

    if(totalPages === page){
      refs.button.classList.add('is-hidden')
    }

  }
  catch(error){
    console.log(error.message)
  }
  finally{
    instance.close()
  }
}


const loadMorePictures = async (event)=> {
  page++
  instance.show()

  try {
    const {hits} = await getData(inputValue, page)
    renderCards(hits)

    const lastCard = refs.gallery.children[refs.gallery.children.length - 1];
    const cardHeight = lastCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth"
    })

    if(totalPages === page){
      refs.button.classList.add('is-hidden')
      iziToast.info({message: 'We\'re sorry, but you\'ve reached the end of search results.\n'})
    }

  } catch (error) {
    console.log(error.message)
  }
  finally{
    instance.close()
  }
}

refs.form.addEventListener('submit', handleSubmit)

refs.button.addEventListener('click', loadMorePictures)

refs.loader.classList.add('is-hidden')