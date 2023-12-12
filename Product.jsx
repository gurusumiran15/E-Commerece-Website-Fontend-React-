import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { actions } from "../store/index";
import { ReactComponent as CartIcon } from "../assets/svg/cart-shopping-solid.svg";
import { ReactComponent as StarIcon } from "../assets/svg/star.svg";
import {
  getProduct,
  addProductToCart,
  getProductFromCart,
} from "../fetch/index";
import imagePlaceholder from "../assets/img/image-placeholder.jpg";
import styles from "./Product.module.css";
import Reviews from "../components/review/Reviews";

export default function ProductPage() {
  const [product, setProduct] = useState();
  const [refetch, setRefetch] = useState(true);
  const productId = Number(useParams().productId);

  useEffect(() => {
    if (refetch === false) return;
    getProduct(productId)
      .then((product) => setProduct(product))
      .catch((error) => console.log(error));
    setRefetch(false);
  }, [productId, refetch]);

  if (!product) {
    return <h3>Loading...</h3>;
  }

  return (
    <div
      className="display-container product-page bg-white"
      style={{ padding: "50px" }}
    >
      <div className="row">
        <div className="col col-12 col-lg-6">
          <div className={styles.preview}>
            <img
              src={product.imageUrl || imagePlaceholder}
              alt="Product"
              height="500px"
              width="80%"
            />
          </div>
          <CartButton productId={product.productId} />
        </div>
        <div className="col col-12 col-lg-6">
          <Details product={product} />
        </div>
      </div>
      <hr />
      <Reviews product={product} setRefetch={setRefetch} />
    </div>
  );
}

function CartButton(props) {
  const { productId } = props;
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isLoggedIn) return dispatch(actions.loginModalActions.open());
    addProductToCart(productId, user)
      .then((response) => navigate("/cart"))
      .catch((error) => console.log(error));
  };
  const handleGoToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    if (isLoggedIn) {
      getProductFromCart(productId, user)
        .then((product) => {
          if (product) setIsAddedToCart(true);
        })
        .catch((error) => console.log(error));
    } else {
      setIsAddedToCart(false);
    }
  }, [isLoggedIn, productId, user]);

  return (
    <button
      className={styles["btn-cart"] + " btn btn-dark"}
      onClick={isAddedToCart ? handleGoToCart : handleAddToCart}
    >
      <CartIcon
        style={{
          width: "20px",
          height: "20px",
          fill: "white",
          marginRight: "8px",
        }}
      />{" "}
      {isAddedToCart ? "GO TO CART" : "ADD TO CART"}
    </button>
  );
}

function Details(props) {
  const {
    productName,
    markedPrice,
    sellingPrice,
    reviewCount,
    totalRating,
    description,
  } = props.product;

  const discount = Math.floor(
    ((markedPrice - sellingPrice) * 100.0) / markedPrice
  );
  const rating = reviewCount === 0 ? 0.0 : totalRating / reviewCount;

  return (
    <div>
      <h3>{productName}</h3>
      <br />
      <div className={styles.rating}>
        <div className={styles.score}>
          <span>{rating.toFixed(1) + " "}</span>
          <StarIcon className={styles.star} />
        </div>
        <span className={styles.reviews}>
          {" "}
          {reviewCount.toLocaleString()} Reviews
        </span>
      </div>
      {discount === 0 ? (
        <div className={styles.price}>
          <span className={styles.main}>
            &#8377;{markedPrice.toLocaleString()}
          </span>
        </div>
      ) : (
        <div className={styles.price}>
          <span className={styles.main}>
            &#8377;{sellingPrice.toLocaleString()}
          </span>
          <span className={styles.original}>
            {" "}
            &#8377;{markedPrice.toLocaleString()}
          </span>
          <span className={styles.discount}>{discount}% off</span>
        </div>
      )}
      <div>
        <h3>Description</h3>
        <span>{description}</span>
      </div>
    </div>
  );
}
