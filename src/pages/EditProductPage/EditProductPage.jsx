import "./EditProductPage.scss"

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
import { useNavigate, useParams } from "react-router-dom"
import { URL_LOG_IN_PAGE, URL_USER_PRODUCTS_PAGE } from "../../constants"

const { fetchProductByID, updateProductByID } = productActions
const { selectProductCategories } = productSelectors
const { selectIsUserAuthenticated } = authSelectors

const EditProductPage = () => {
  const productCategories = useSelector(selectProductCategories)
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { productID } = useParams()

  const [selectedCategories, setSelectedCategories] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState()
  const [product, setProduct] = useState({})

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { isValid },
  } = useForm()

  useEffect(() => {
    const triggerFetch = async () => {
      if (isUserAuthenticated) {
        const { success, data } = await dispatch(fetchProductByID(productID))

        if (success) {
          const { title, description, currentPrice } = data

          setProduct(data)
          setValue("title", title)
          setValue("description", description)
          setValue("price", currentPrice)
          setSelectedCategories(data?.tags)
          setFocus("title")
        } else {
          navigate(URL_USER_PRODUCTS_PAGE)
        }
      } else {
        navigate(URL_LOG_IN_PAGE)
      }
    }

    triggerFetch()
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
      updateProductByID(productID, {
        title,
        description,
        currentPrice: price,
        previousPrice: product?.currentPrice,
        tags: selectedCategories,
        imageFile,
      }),
    )

    if (success) {
      navigate(URL_USER_PRODUCTS_PAGE)
    } else {
      alert(message)
      reset()
    }
    setIsSubmitting(false)
  }

  return (
    <div className="edit-product-page">
      <form
        className="edit-product-page__form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="edit-product-page__main-header">Edit Product</h3>
        <p className="edit-product-page__sub-title-text">
          Edit information of your product.
        </p>
        <div className="edit-product-page__form-controls-wrapper">
          <TextInput
            placeholder={"Title"}
            {...register("title", { required: true })}
          />
          <TextInput
            placeholder={"Description"}
            {...register("description", { required: true })}
          />
          <TextInput
            label="$"
            placeholder={"Price"}
            type="number"
            {...register("price", { required: true })}
          />
          <p className="edit-product-page__sub-title-text">Categories</p>
          <p className="edit-product-page__field-description">
            Select the categories of the product.
          </p>
          <ul className="edit-product-page__categories-list">
            {productCategories.map((productCategory) => {
              const { id, title } = productCategory

              const isSelected = selectedCategories.includes(title)

              return (
                <li
                  key={id}
                  className="edit-product-page__categories-list-item"
                >
                  <button
                    type="button"
                    className={`edit-product-page__category-button ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handleCategoryButtonClick(title)}
                  >
                    {title}
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="edit-product-page__sub-title-text">Image</p>
          <p className="edit-product-page__field-description">
            Upload an image for the product.
          </p>

          <input
            className="edit-product-page__image-field"
            type="file"
            name="image"
            id="image"
            onChange={handleImageFieldChange}
          />

          <div className="edit-product-page__submit-button-wrapper">
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

export default EditProductPage
