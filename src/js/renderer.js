export function renderer(data, template) {
  const galleryEl = document.querySelector('.gallery');

  galleryEl.insertAdjacentHTML('beforeend', template(data));
}
