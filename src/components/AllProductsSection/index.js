import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    activeStarId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, activeCategoryId, activeStarId, searchInput} =
      this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeStarId}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({productsList: undefined, isLoading: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList === undefined) {
      return (
        <div className="error-products-card">
          <img
            className="error-products-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            alt="products failure"
          />
          <h1 className="error-products-heading">Opps! Something Went Wrong</h1>
          <p className="error-products-description">
            We are having some trouble processing your request. Please try
            again.
          </p>
        </div>
      )
    } else if (productsList.length === 0) {
      return (
        <div className="no-products-card">
          <img
            className="no-products-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-description">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    } else {
      return (
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickSpecificCategory = categoryId => {
    const findCategory = categoryOptions.find(
      eachOption => categoryId === eachOption.categoryId,
    )
    this.setState({activeCategoryId: findCategory.categoryId}, this.getProducts)
  }

  onClickSpecificRating = ratingId => {
    const findRating = ratingsList.find(
      eachRating => ratingId === eachRating.ratingId,
    )
    this.setState({activeStarId: findRating.ratingId}, this.getProducts)
  }

  onKeyEnter = keys => {
    const {searchInput} = this.state
    if (keys === 'Enter') {
      this.setState({searchInput: searchInput}, this.getProducts)
    } else {
      this.setState(prevState => ({
        searchInput: prevState.searchInput + keys,
      }))
    }
  }

  onClickFilter = () => {
    this.setState({
      activeCategoryId: '',
      activeStarId: '',
      searchInput: '',
      productsList: [],
      isLoading: false,
      activeOptionId: sortbyOptions[0].optionId,
    }, this.getProducts)
  }

  // TODO: Add failure view

  render() {
    const {isLoading, searchInput, activeCategoryId, activeStarId} =
      this.state
    console.log(searchInput)

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          onClickSpecificCategory={this.onClickSpecificCategory}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          activeCategoryId={activeCategoryId}
          activeStarId={activeStarId}
          onClickSpecificRating={this.onClickSpecificRating}
          onClickFilter={this.onClickFilter}
          onKeyEnter={this.onKeyEnter}
          searchInput={searchInput}
        />

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
