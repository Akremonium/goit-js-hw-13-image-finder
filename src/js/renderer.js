export function renderer(data, template) {
  const galleryEl = document.querySelector('.gallery');

  galleryEl.innerHTML = template(data);
}
