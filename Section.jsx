import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CategoryCard from "../components/cards/CategoryCard";
import { getSection } from "../fetch/index";

export default function SectionPage() {
  const [section, setSection] = useState(null);
  const sectionId = Number(useParams().sectionId);

  useEffect(() => {
    getSection(sectionId)
      .then((section) => setSection(section))
      .catch((error) => console.log(error));
  }, [sectionId]);

  if (!section) return <>Loading...</>;

  return (
    <div className="bg-white row">
      {section.categories.map((category) => (
        <div
          key={category.categoryId}
          className="col col-md-4 col-lg-3"
          style={{ padding: "10px" }}
        >
          <CategoryCard category={category} width="250px" />
        </div>
      ))}
    </div>
  );
}
