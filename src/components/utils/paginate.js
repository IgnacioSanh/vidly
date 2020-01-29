import _ from "lodash";

export default function paginate(items, pageNumber, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  return _(items)
    .slice(startIndex)
    .take(itemsPerPage)
    .value();
}
