import "./PostsFeedPage.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { productActions, productSelectors } from "../../state/index"

const { fetchProductCategories } = productActions
const { selectProductCategories } = productSelectors

const PostsFeedPage = () => {
  const productCategories = useSelector(selectProductCategories)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProductCategories())
  })

  const handleCategoryButtonClick = (url) => {
    navigate(url)
  }

  return (
    <div className="posts-feed-page">
      <section className="posts-feed-page__items-by-category-section">
        <h2 className="posts-feed-page__section-heading">
          Discover Your Perfect Item
        </h2>
        <p className="posts-feed-page__section-paragraph">
          Find the item you&apos;re looking for from the following categories:
        </p>
        <ul className="posts-feed-page__categories-list">
          {productCategories.map((productCategory, index) => {
            const { id, title } = productCategory

            const colorType = String.fromCharCode(97 + (index % 4))

            return (
              <li key={id} className="posts-feed-page__categories-list-item">
                <button
                  className={`posts-feed-page__category-button is-color-${colorType}`}
                  onClick={() =>
                    handleCategoryButtonClick(`/search?category=${title}`)
                  }
                >
                  {title}
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default PostsFeedPage
