import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  onSelectItem,
  valueProperty,
  textProperty
}) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        return (
          <li
            key={item[textProperty]}
            style={{ cursor: "pointer" }}
            className={
              selectedItem === item[valueProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              onSelectItem(item);
            }}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListGroup;
