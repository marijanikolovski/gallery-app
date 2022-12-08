const selectGalleries = (state) => state.galleries.page;

const selectGallery = (state) => state.galleries.gallery;

const selectNewGallery = (state) => state.galleries.newGallery

export { 
    selectGalleries, 
    selectGallery,
    selectNewGallery
};
