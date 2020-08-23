import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

export default function SingleCocktail() {
  const [cocktail, setCocktail] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    try {
      async function getCocktail() {
        const response = await fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const { strDrink: name, strDrinkThumb: image,
          strCategory: category, strGlass: glass, strInstructions: instructions, strAlcoholic: info,
          strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 } = data.drinks[0];
        const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];
        const newCocktail = { name, image, category, glass, info, instructions, ingredients };
        setCocktail(newCocktail);
      }
      getCocktail();
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [id]);

  if (loading) {
    return <h2 className="section-title"> Loading..</ h2>
  }

  if (!cocktail) {
    return <h2 className="section-title">No cocktail available...</h2>
  }
  else {
    const { name, image, category, info, glass, instructions, ingredients } = cocktail;
    console.log(cocktail.ingredients)
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">back to home </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>name: {name}</p>
            <p>category: {category}</p>
            <p>info: {info}</p>
            <p>glass: {glass}</p>
            <p>instructions: {instructions}</p>
            <p>
              ingredients: {ingredients ? ingredients.map((item, index) => {
              return <span key={index}>{item}</span>
            }) : null}
            </p>
          </div>
        </div>
      </section>
    )
  }
}
