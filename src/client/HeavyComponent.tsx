import React from "react";
let status = "pending";
let result = null;

const asyncFunc = (func: Promise<any>) => {
  const fetching = func
    .then((success) => {
      status = "fulfilled";

      result = success;
    })
    .catch((error) => {
      status = "rejected";

      result = error;
    });

  if (status === "pending") {
    throw fetching;
  } else if (status === "rejected") {
    throw result;
  } else if (status === "fulfilled") {
    return result;
  }
};

export default function HeavyComponent() {
  const data = asyncFunc(getData());

  async function getData() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return { username: "itsmicaio" };
  }
  return (
    <div>
      <h3>Demorei mas carreguei!</h3>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
