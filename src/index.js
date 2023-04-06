// import './css/styles.css';
import createCardMarkup from './templates/gallery-card.hbs';
import GalleryApiService from './js/fetch-images.js';
import Notiflix from 'notiflix';
import LoadMoreBtn from './js/load-more-btn.js';
import { lightbox } from './js/lightbox.js';

function appendImagesMarkup(images) {
    refs.galleryCardEl.insertAdjacentHTML('beforeend', createCardMarkup(images));
};

function clearImagesContainer() {
    refs.galleryCardEl.innerHTML = '';
};

const galleryApiService = new GalleryApiService();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

// console.log(loadMoreBtn);

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    searchInputEl: document.querySelector('.search-input'),
    searchBtnEl: document.querySelector('.search-btn'),
    galleryCardEl: document.querySelector('.gallery'),
};


function onSearchBtnClick(event) {
    event.preventDefault();
    clearImagesContainer();

    galleryApiService.query = event.currentTarget.elements.searchQuery.value.trim();

    if (galleryApiService.searchQuery === '') {
        return Notiflix.Notify.failure(
            'Please enter your search query.'
        );
    }

    loadMoreBtn.show();
    galleryApiService.resetPage();
    clearImagesContainer();
    fetchPhotos();

};


async function fetchPhotos() {
    try {
        // loadMoreBtn.disable();
        // galleryApiService.fetchImages()
        //     .then(images => {
        //         appendImagesMarkup(images);
        //         loadMoreBtn.eneble();
        //     });

        const { hits, totalHits } = await galleryApiService.fetchImages();
        loadMoreBtn.disable();
        appendImagesMarkup(hits);
        loadMoreBtn.eneble();

        if (!hits.length) {
            loadMoreBtn.hide();
            clearImagesContainer();
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again`);
        } else if (refs.galleryCardEl.children.length >= totalHits) {
            loadMoreBtn.hide();
            Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
        } else {
            setTimeout(() => {
                const countImages = totalHits - refs.galleryCardEl.children.length;
                Notiflix.Notify.success(`Hooray! We found ${countImages} images.`);
            }, 800);
        }
        lightbox.refresh();
    } catch (error) {
        console.log(error);
    }

};

refs.searchFormEl.addEventListener('submit', onSearchBtnClick);
loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);





////////////////////////////////////////////////////
// const galleryApiService = new GalleryApiService();
// const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
// });

// // console.log(loadMoreBtn);

// const refs = {
//     searchFormEl: document.querySelector('#search-form'),
//     searchInputEl: document.querySelector('.search-input'),
//     searchBtnEl: document.querySelector('.search-btn'),
//     galleryCardEl: document.querySelector('.gallery'),
// };

// refs.searchFormEl.addEventListener('submit', onSearchBtnClick);
// loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);

// function onSearchBtnClick(event) {
//     event.preventDefault();
//     clearImagesContainer();

//     galleryApiService.query = event.currentTarget.elements.searchQuery.value.trim();

//     if (galleryApiService.searchQuery === '') {
//         return Notify.failure(
//             'Please enter your search query.'
//         );
//     }

//     loadMoreBtn.show();
//     galleryApiService.resetPage();
//     clearImagesContainer();
//     fetchPhotos();

// };

// function fetchPhotos() {
//     loadMoreBtn.disable();
//     galleryApiService.fetchImages()
//         .then(images => {
//             appendImagesMarkup(images);
//             loadMoreBtn.eneble()
//         });

// };

// function appendImagesMarkup(images) {
//     refs.galleryCardEl.insertAdjacentHTML('beforeend', createCardMarkup(images));
// };

// function clearImagesContainer() {
//     refs.galleryCardEl.innerHTML = '';
// };
