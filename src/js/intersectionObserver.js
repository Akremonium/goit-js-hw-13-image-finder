export function infiniteScroll(render, pageNumber) {
  const anchor = document.querySelector('.anchore');

  const observer = new IntersectionObserver(onListEnd, {
    threshold: 0,
  });

  observer.observe(anchor);

  function onListEnd([entrie], observer) {
    if (!entrie.isIntersecting) return;
    pageNumber + 1;
    render;
    console.log('eh?');
    console.log(pageNumber);

    // observer.unobserve(entrie.target);
  }
}
