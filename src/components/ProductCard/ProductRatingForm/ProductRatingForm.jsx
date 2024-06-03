import "./ProductRatingForm.scss"

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import PropTypes from "prop-types"

import TextInput from "../../TextInput/TextInput"
import Button from "../../Button/Button"
import ProductRating from "../../ProductRating/ProductRating"
import { productActions } from "../../../state"

const { rateProduct } = productActions

const ProductRatingForm = ({ productID, onSubmit = () => {} }) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: { rating: 0 },
  })

  const rating = watch("rating")

  const onFormSubmit = async (data) => {
    setIsSubmitting(true)

    const { rating } = data

    const { success } = await dispatch(rateProduct(productID, rating))

    if (success) {
      onSubmit()
    }

    setIsSubmitting(false)
  }

  return (
    <form className="product-rating-form" onSubmit={handleSubmit(onFormSubmit)}>
      <p className="product-rating-form__title">Rate your purchase!</p>
      <p className="product-rating-form__sub-title">
        Fill out this form based on your experience.
      </p>

      <div className="product-rating-form__product-rating-wrapper">
        <ProductRating value={rating} />
      </div>

      <div className="product-rating-form__text-field-wrapper">
        <TextInput
          label="Range: 0 - 10"
          placeholder={"Product rating"}
          type="number"
          min={0}
          max={10}
          step={1}
          {...register("rating", { required: true })}
        />
      </div>

      <div className="product-rating-form__submit-button-wrapper">
        <Button
          type="submit"
          text={"Submit"}
          isDisabled={!isValid}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  )
}

ProductRatingForm.propTypes = {
  productID: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default ProductRatingForm
