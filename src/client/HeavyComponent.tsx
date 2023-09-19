import React from "react";
let status = "pending";
let result = null;

const data = fetchData();

export default function HeavyComponent() {
  const obj = data();
  return (
    <div>
      <h3>Demorei mas carreguei!</h3>
      <p>{JSON.stringify(obj)}</p>
    </div>
  );
}

function fetchData() {
  const fetching = new Promise((resolve) => setTimeout(resolve, 5000))
    .then((res) => ({ obj: "obj" }))
    .then((success) => {
      status = "fulfilled";

      result = success;
    })
    .catch((error) => {
      status = "rejected";

      result = error;
    });

  return () => {
    if (status === "pending") {
      throw fetching;
    } else if (status === "rejected") {
      throw result;
    } else if (status === "fulfilled") {
      return result;
    }
  };
}
