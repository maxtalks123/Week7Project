import { useSearchParams } from "react-router-dom";
import Categories from "./Categories";

export default function SortFunction({ optionValue }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get("sort");

  //   function handleSort(guestbook, categoryName) {
  //     if (categoryName === "in the middle") return guestbook;
  //     else if (categoryName === "positive") return guestbook;
  //     else if (categoryName === "negative") return guestbook;
  //     return 0;
  //   }

  const handleForm = (event) => {
    setSearchParams({ sort: event.target.value });
  };
  return (
    <>
      <label>
        Sort by category:
        <select value="" {...sortType} onChange={handleForm}>
          <option value="">category A</option>
          <option value="">category B{optionValue}</option>
        </select>
      </label>
    </>
  );
}
