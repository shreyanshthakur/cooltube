import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Gaming",
  "Songs",
  "Cricket",
  "Live",
  "News",
  "Boxing",
  "Cooking",
  "God of war",
  "Live",
];

const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((btn, index) => (
        <Button key={index} name={btn} />
      ))}
    </div>
  );
};

export default ButtonList;
