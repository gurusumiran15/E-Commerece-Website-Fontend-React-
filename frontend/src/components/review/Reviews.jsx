import { useDispatch, useSelector } from "react-redux";

import { actions } from "../../store/index";
import { addReviewOfProduct, deleteReviewOfProduct } from "../../fetch/index";
import AddReview from "./AddReview";
import ReviewCard from "./ReviewCard";

export default function Reviews(props) {
  const { product, setRefetch } = props;
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAdd = (values) => {
    if (!isLoggedIn) return dispatch(actions.loginModalActions.open());
    if (values.rating === 0 || values.text === "")
      return alert("Empty fields not allowed!");
    addReviewOfProduct(values, product, user)
      .then((response) => setRefetch(true))
      .catch((error) => alert(error));
  };

  const ownReview = product.reviews.find(
    (review) => review.userId === Number(user?.userId)
  );
  const handleDelete = () => {
    deleteReviewOfProduct(ownReview, product, user)
      .then((response) => setRefetch(true))
      .catch((error) => alert(error));
  };

  if (product.reviews.length === 0) return <AddReview handleAdd={handleAdd} />;

  return (
    <>
      <h3>Reviews</h3>
      {product.reviews.map((review) => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
      {!ownReview ? (
        <>
          <hr />
          <AddReview handleAdd={handleAdd} />
        </>
      ) : (
        <button type="button" className="btn btn-dark" onClick={handleDelete}>
          Delete Review
        </button>
      )}
    </>
  );
}
