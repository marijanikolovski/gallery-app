import React from "react";

export const GallerySerchComponent = ({
    handleSearchTerm,
    handleSearch
}) => {

  return (
    <div>
      <input
        type="text"
        onChange={handleSearchTerm}
        placeholder="Input search term here"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
