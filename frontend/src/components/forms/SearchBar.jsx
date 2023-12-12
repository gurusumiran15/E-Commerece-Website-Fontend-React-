import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/svg/magnifying-glass-solid.svg";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === "") return;
    const text = value.split(" ").join("+");
    navigate("/products/search?text=" + text);
  };

  return (
    <form
      className="d-flex search-bar"
      role="search"
      onSubmit={handleSubmit}
      action="/"
    >
      <div className="input-group">
        <input
          name="query"
          className="form-control"
          type="text"
          placeholder="Search for products"
          aria-label="Search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          style={{ borderRadius: "0" }}
        />
        <button className="btn btn-primary" type="submit">
          <SearchIcon
            style={{
              width: "20px",
              height: "20px",
              fill: "white",
              paddingBottom: "2px",
            }}
          />
        </button>
      </div>
    </form>
  );
}
