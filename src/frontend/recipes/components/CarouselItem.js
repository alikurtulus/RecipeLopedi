import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const CarouselItem =  props => {
    console.log(props)
  return (
    <Carousel.Item>
    <img
      className="d-block w-100"
      src={`https://spoonacular.com/recipeImages/${props.image}`}
      alt={props.alt}
    />
    <Carousel.Caption>
      <h3>{props.title}</h3>
      <p>{props.readyInMinutes}</p>
      <p>{props.servings}</p>
    </Carousel.Caption>
  </Carousel.Item>
  )
}
export default CarouselItem