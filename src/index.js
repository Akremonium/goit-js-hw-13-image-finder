import './sass/main.scss';

const debounce = require('lodash.debounce');

import fetcher from './js/apiService';
import { renderer } from './js/renderer';
import imgCardTpl from './templates/imgCardTpl.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';
defaults.closerHover = false;

import { refs } from './js/refs';

refs.input.addEventListener('input', debounce(onInput, 1000));

function onInput() {
  fetcher.query = refs.input.value.trim();

  refs.gallery.innerHTML = '';
  fetcher.resetPage();

  if (fetcher.query !== '') {
    fetcher.fetchImg().then(data => {
      if (data.length > 0) {
        renderer(data, imgCardTpl);
        refs.input.value = '';
      } else {
        showErrorMsg('Sorry, no matches found.');
      }
    });
  }
}

function showErrorMsg(text) {
  error({
    title: `${text}`,
    delay: 3000,
  });
}

infiniteScroll();

function infiniteScroll() {
  const observer = new IntersectionObserver(onListEnd, {
    rootMargin: '200px',
  });

  observer.observe(refs.anchor);

  function onListEnd([entry]) {
    if (entry.isIntersecting && refs.gallery.innerHTML !== '') {
      fetcher.fetchImg().then(data => {
        if (data.totalHits !== 0) {
          renderer(data, imgCardTpl);
        }
      });
    }
  }
}
