import axios from 'axios';
const API_KEY = '34965736-5e5d7805a8fd9db422550a68f';
const BASE_URL = 'https://pixabay.com/api/';

export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };

    async fetchImages() {
        console.log(this);
        return await axios.get(`${BASE_URL}?key=${API_KEY}&q='${this.searchQuery}'&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
            .then(response => {
                this.incrementPage();
                return response.data;
            });
    };
    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
} 
