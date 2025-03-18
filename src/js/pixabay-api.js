import axios from 'axios';

export const getData = (name) => {
  return axios.get(`https://pixabay.com/api/`, { params: {
    key: '49325952-cafcda966d997e584839964e4',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
}})
}

