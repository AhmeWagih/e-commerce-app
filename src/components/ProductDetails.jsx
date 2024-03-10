import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "../ReduxToolKit/Clices/cart-clice";
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addToCart(product));
  };
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await res.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);
  const Loading = () => {
    return (
      <Fragment>
        <div className="col-md-6">
          <Skeleton height={450} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={100} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} width={150} />
          <Skeleton height={100} />
          <Skeleton height={50} />
        </div>
      </Fragment>
    );
  };
  const ShowProducts = () => {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              height="400px"
              width="400px"
            />
          </div>
          <div className="col-md-6">
            <h4 className="text-uppercase text-black-50">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead fw-bold">
              Rating {product.rating && product.rating.rate}{" "}
              <FontAwesomeIcon icon={faStar} />
            </p>
            <h3 className="display-6 fw-bold my-4">${product.price}</h3>
            <p className="lead">{product.description}</p>
            <button
              className="btn btn-outline-dark me-2 px-4 py-2"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark px-4 py-2">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container py-5">
      <div className="row py-4">{loading ? <Loading /> : <ShowProducts />}</div>
    </div>
  );
}

export default ProductDetails;
