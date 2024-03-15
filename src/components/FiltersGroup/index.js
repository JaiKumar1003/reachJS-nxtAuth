import './index.css'

const FiltersGroup = props => {
  const {
    activeStarId,
    activeCategoryId,
    onClickSpecificCategory,
    onClickSpecificRating,
    categoryOptions,
    ratingsList,
    onClickFilter,
    onKeyEnter,
    searchInput,
  } = props

  const onClickFilterButton = () => {
    onClickFilter()
  }

  const onClickCategory = categoryId => {
    onClickSpecificCategory(categoryId)
  }

  const onClickRating = ratingId => {
    onClickSpecificRating(ratingId)
  }

  const onkeypressEnter = event => {
    onKeyEnter(event.key)
  }

  return (
    <div className="filters-group-container">
      <input
        onKeyDown={onkeypressEnter}
        value={searchInput}
        className="product-search-input"
        type="search"
        placeholder="Search"
      />
      <h1 className="category-heading">Category</h1>
      <ul className="category-list">
        {categoryOptions.map(eachOption => {
          const isActive =
            activeCategoryId === eachOption.categoryId
              ? 'category-item style-category'
              : 'category-item'

          const {categoryId, name} = eachOption

          return (
            <li
              className={isActive}
              onClick={() => onClickCategory(categoryId)}
              key={categoryId}
            >
              {name}
            </li>
          )
        })}
      </ul>
      <p className="rating-heading">Rating</p>
      <ul className="rating-list">
        {ratingsList.map(eachRating => {
          const isActive =
            activeStarId === eachRating.ratingId
              ? 'rating-item style-rating'
              : 'rating-item'

          const {ratingId, imageUrl} = eachRating

          return (
            <li
              onClick={() => onClickRating(ratingId)}
              className="rating-card"
              key={ratingId}
            >
              <img
                className="star-img"
                src={imageUrl}
                alt={`rating ${ratingId}`}
              />
              <p className={isActive}>& up</p>
            </li>
          )
        })}
      </ul>
      <button
        onClick={onClickFilterButton}
        type="button"
        className="filter-button"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
