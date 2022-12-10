const selectGalleries = (state) => state.galleries.page;

const selectGallery = (state) => state.galleries.gallery;

const selectNewGallery = (state) => state.galleries.newGallery

const selectSearcUserId = (state) => state.galleries.userId

const selectSearchTerm = (state) => state.galleries.term;

export { 
    selectGalleries, 
    selectGallery,
    selectNewGallery,
    selectSearcUserId,
    selectSearchTerm
};
