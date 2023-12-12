import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MessageCard from "../components/cards/MessageCard";
import { getOrders } from "../fetch/index";
import styles from "./Orders.module.css";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { width } = useWindowDimensions();
  console.log(width);

  useEffect(() => {
    if (isLoggedIn) {
      getOrders(user)
        .then((res) => setOrders(res))
        .catch((err) => alert(err));
    } else {
      setOrders([]);
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return <MessageCard message="Not Logged In" />;
  if (!orders || orders.length === 0)
    return <MessageCard message="No Orders Yet" />;

  if (width < 991) return <CompactOrders orders={orders} />;

  return (
    <div className={styles.container + " bg-white"}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className={styles.name}>
                <div className="d-flex">
                  <Link to={`/products/${order.product.productId}`}>
                    <img
                      src={order.product.imageUrl}
                      alt="product"
                      width="100px"
                      height="100px"
                      className="zoom"
                    />
                  </Link>
                  {order.product.productName}
                </div>
              </td>
              <td>{order.orderDate.substr(0, 10)}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompactOrders(props) {
  const { orders } = props;
  return (
    <div className={styles.container + " bg-white"}>
      {orders.map((order, index) => {
        return (
          <Fragment key={index}>
            <div style={{ padding: "30px 20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Link to={`/products/${order.product.productId}`}>
                  <img
                    src={order.product.imageUrl}
                    alt="product"
                    width="100px"
                    height="100px"
                    className="zoom"
                  />
                </Link>
                <p
                  className="ovf-ellipse"
                  style={{
                    flexGrow: 1,
                    overflow: "hidden",
                    marginLeft: "30px",
                    fontWeight: "bold",
                  }}
                >
                  {order.product.productName}
                </p>
              </div>
              <div
                style={{
                  marginTop: "30px",
                  padding: "20px",
                  border: "1px solid #ccc",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Ordered on : </p>
                  <p>{order.orderDate.substr(0, 10)}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Quantity : </p>
                  <p>{order.quantity}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Total amount : </p>
                  <p>{order.totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <hr />
          </Fragment>
        );
      })}
    </div>
  );
}
