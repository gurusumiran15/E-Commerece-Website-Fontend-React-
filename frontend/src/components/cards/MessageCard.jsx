export default function MessageCard(props) {
  return (
    <div
      className="bg-white"
      style={{ textAlign: "center", height: "200px", padding: "80px" }}
    >
      <h3>{props.message}</h3>
    </div>
  );
}
