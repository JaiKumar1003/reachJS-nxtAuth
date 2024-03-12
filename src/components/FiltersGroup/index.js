import './index.css'

const FiltersGroup = props => {
  const {onClickSpecificCategory, categoryOptions, ratingsList} = props
  const onClickCategory = catgoryId => {
    onClickSpecificCategory(catgoryId)
    console.log(catgoryId)
  }
  return (
    <div className="filters-group-container">
      <input
        className="product-search-input"
        type="search"
        placeholder="Search"
      />
      <h1 className="category-heading">Category</h1>
      <ul className="category-list">
        {categoryOptions.map(eachOption => (
          <li
            className="category-item"
            onClick={onClickCategory(eachOption.categoryId)}
            key={eachOption.categoryId}
          >
            {eachOption.name}
          </li>
        ))}
      </ul>
      <p className="rating-heading">Rating</p>
      <ul className="rating-list">
        {ratingsList.map(eachRating => (
          <li className="rating-card" key={eachRating.ratingId}>
            <img className="star-img" src={eachRating.imageUrl} alt="rating" />
            <p className="rating-item">& up</p>
          </li>
        ))}
      </ul>
      <button type="button" className="filter-button">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
