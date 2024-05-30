import "./AddProductPage.scss"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"

import {
  productActions,
  productSelectors,
  authSelectors,
} from "../../state/index"
import { useNavigate } from "react-router-dom"
import { URL_HOME_PAGE, URL_LOG_IN_PAGE } from "../../constants"

const { fetchProductCategories, createProduct } = productActions
const { selectProductCategories } = productSelectors
const { selectIsUserAuthenticated } = authSelectors

const AddProductPage = () => {
  const productCategories = useSelector(selectProductCategories)
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedCategories, setSelectedCategories] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm()

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchProductCategories())
    } else {
      navigate(URL_LOG_IN_PAGE)
    }
  }, [])

  const handleCategoryButtonClick = (category) => {
    if (selectedCategories.includes(category)) {
      const index = selectedCategories.indexOf(category)
      const tempArray = [...selectedCategories]

      tempArray.splice(index, 1)

      setSelectedCategories(tempArray)
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  function handleImageFieldChange(e) {
    setImageFile(e.target.files[0])
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    const { title, description, price } = data

    const { success, message } = await dispatch(
      createProduct({
        title,
        description,
        currentPrice: price,
        tags: selectedCategories,
        imageFile,
      }),
    )

    if (success) {
      navigate(URL_HOME_PAGE)
    } else {
      alert(message)
      reset()
    }

    setIsSubmitting(false)
  }

  return (
    <div className="add-product-page">
      <form
        className="add-product-page__form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="add-product-page__main-header">Post a New Product</h3>
        <p className="add-product-page__sub-title-text">
          Fill out the form with your new product&apos;s information
        </p>
        <div className="add-product-page__form-controls-wrapper">
          <TextInput
            placeholder={"Title"}
            {...register("title", { required: true })}
          />
          <TextInput
            placeholder={"Description"}
            {...register("description", { required: true })}
          />
          <TextInput
            placeholder={"Price"}
            {...register("price", { required: true })}
          />

          <p className="add-product-page__sub-title-text">Categories</p>
          <p className="add-product-page__field-description">
            Select the categories of the product.
          </p>
          <ul className="add-product-page__categories-list">
            {productCategories.map((productCategory) => {
              const { id, title } = productCategory

              const isSelected = selectedCategories.includes(title)

              return (
                <li key={id} className="add-product-page__categories-list-item">
                  <button
                    type="button"
                    className={`add-product-page__category-button ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handleCategoryButtonClick(title)}
                  >
                    {title}
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="add-product-page__sub-title-text">Image</p>
          <p className="add-product-page__field-description">
            Upload an image for the product.
          </p>

          <input
            className="add-product-page__image-field"
            type="file"
            name="image"
            id="image"
            onChange={handleImageFieldChange}
          />

          <div className="add-product-page__submit-button-wrapper">
            <Button
              type="submit"
              text={"Create"}
              isDisabled={!isValid}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProductPage
