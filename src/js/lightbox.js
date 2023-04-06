import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let lightbox = new simpleLightbox('.gallery a', {
    captionDelay: 250,
    close: true,
});