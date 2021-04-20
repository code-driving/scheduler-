import React from "react";

import "components/DayListItem.scss";
const classNames = require("classnames");

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots === 0) {
      return `no spots remaining`;
    }
    if (spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  };

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
// return (
//   <li className={dayClass} onClick={() => props.setDay(props.name)}>
//     <h2 className="text--regular">{props.name}</h2>
//     {props.spots > 1 && <h3 className="text--light">{props.spots} spots</h3>}
//     {props.spots === 1 && <h3 className="text--light">{props.spots} spot</h3>}
//     {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
//   </li>
// );
