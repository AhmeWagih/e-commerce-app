import { Fragment, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../ReduxToolKit/Clices/product-slice";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  // get all categories from api to filter
  const getCategory = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };
  // after filter show data
  const getProductInCategory = (categoryName) => {
    setActiveCategory(categoryName);
    dispatch(fetchProductsByCategory(categoryName));
  };
  useEffect(() => {
    dispatch(fetchProducts());
    getCategory();
  }, [dispatch]);
  const Loading = () => {
    return (
      <Fragment>
        {Array.from(
          { length: products.length > 0 ? products.length : 10 },
          (_, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <Skeleton height={350} />
            </div>
          )
        )}
      </Fragment>
    );
  };
  const ShowProducts = () => {
    return (
      <Fragment>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className={`btn btn-outline-dark me-2 text-capitalize ${
              activeCategory === null ? "active" : ""
            }`}
            onClick={() => {
              setActiveCategory(null);
              dispatch(fetchProducts());
            }}
          >
            All
          </button>
          {categories.map((category) => {
            return (
              <button
                key={category}
                className={`btn btn-outline-dark me-2 text-capitalize ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => getProductInCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-lg-3 col-md-5 col-sm-6 mb-4" key={product.id}>
                <div className="card h-100 text-center p-4 shadow">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
          <div className="row justufy-content-center">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
