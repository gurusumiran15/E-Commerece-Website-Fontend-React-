import { useEffect, useState } from "react";

import SectionCard from "../components/cards/SectionCard";
import { getAllSections } from "../fetch/index";

export default function HomePage() {
  const [data, setData] = useState();

  useEffect(() => {
    getAllSections()
      .then((sections) => {
        setData(sections);
        console.log(sections)
      })
      .catch((error) => console.log(error));
  }, []);

  if (!data) return <>Loading...</>;

  return (
    <div>
      {data.map((section) => (
        <SectionCard key={section.sectionId} section={section} />
      ))}
    </div>
  );
}
