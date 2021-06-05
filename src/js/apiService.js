export default {
  KEY: '21845085-bf7da5e4527dd4de2f5d726ec',
  ROOT_URL: 'https://pixabay.com/api/',
  query: '',

  fetchImg() {
    const url = `${this.ROOT_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.KEY}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => console.log(error));
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
