import './sass/main.scss';

const debounce = require('lodash.debounce');

import apiService from './js/apiService';
import { renderer } from './js/renderer';
import { infiniteScroll } from './js/intersectionObserver';
import imgCardTpl from './templates/imgCardTpl.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';
defaults.closerHover = false;

const refs = {
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('input'),
};
let pageNumber = 1;

refs.input.addEventListener('input', debounce(onInput, 1000));

function onInput() {
  let searchQuery = refs.input.value.trim();
  refs.gallery.innerHTML = '';
  if (searchQuery !== '') {
    apiService(searchQuery, pageNumber).then(data => {
      if (data.totalHits > 0) {
        const doIt = renderer(data, imgCardTpl);
        pageNumber += 1;
        infiniteScroll(doIt, pageNumber);
        pageNumber += 1;
        refs.input.value = '';
      } else {
        showErrorMsg('Sorry, no matches found.');
      }
    });
  }

  function showErrorMsg(text) {
    error({
      title: `${text}`,
      delay: 3000,
    });
  }
}
