const selectGalleries = (state) => state.galleries.page;

const selectGallery = (state) => state.galleries.gallery;

const selectNewGallery = (state) => state.galleries.newGallery

const selectSearcUserId = (state) => state.galleries.userId

export { 
    selectGalleries, 
    selectGallery,
    selectNewGallery,
    selectSearcUserId,
};
