import './sass/main.scss';

const debounce = require('lodash.debounce');

import apiService from './js/apiService';
import { renderer } from './js/renderer';
import imgCardTpl from './templates/imgCardTpl.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';
defaults.closerHover = false;

import { refs } from './js/refs';
let pageNumber = 1;

refs.input.addEventListener('input', debounce(onInput, 1000));

function onInput() {
  localStorage.clear;
  let searchQuery = refs.input.value.trim();
  localStorage.setItem('input', `${searchQuery}`);
  refs.gallery.innerHTML = '';
  if (searchQuery !== '') {
    pageNumber = 1;
    apiService(searchQuery, pageNumber).then(data => {
      if (data.totalHits > 0) {
        renderer(data, imgCardTpl);
        refs.input.value = '';
        pageNumber += 1;
      } else {
        showErrorMsg('Sorry, no matches found.');
      }
    });
  }

  infiniteScroll(pageNumber);

  function infiniteScroll(pageNumber) {
    const observer = new IntersectionObserver(onListEnd, {
      threshold: 0,
      rootMargin: '500px',
    });

    observer.observe(refs.anchor);

    function onListEnd([entry]) {
      if (!entry.isIntersecting) return;
      else if (refs.gallery.innerHTML !== '') {
        apiService(searchQuery, ++pageNumber).then(data => {
          if (data.totalHits !== 0) {
            renderer(data, imgCardTpl);
          }
        });
      }
    }
  }
}

function showErrorMsg(text) {
  error({
    title: `${text}`,
    delay: 3000,
  });
}
