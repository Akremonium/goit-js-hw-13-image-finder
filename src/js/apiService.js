export default function fetchPictures(query, n) {
  const KEY = '21845085-bf7da5e4527dd4de2f5d726ec';
  const ROOT_URL = 'https://pixabay.com/api/';
  const queryUrl = `${ROOT_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${n++}&per_page=12&key=${KEY}`;

  return fetch(queryUrl)
    .then(res => {
      return res.json();
    })
    .catch(error => {
      return console.error('Error', error);
    });
}
