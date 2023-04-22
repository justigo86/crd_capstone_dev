import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  //useParams used to set parameter/endpoint and pass it to the route (in shop.component)
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]); //starts empty

  //when category or categoriesMap updates 
    //- rerender and set products with that specific category (within categoriesMap)
  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {
          products && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
        {/* because categoriesMap starts as empty - cannot attempt to render until categoriesMap data asynchronously populates
          this is the reason for the short circuit operator (&&) */}
      </div>
    </>
  );
}
 
export default Category;