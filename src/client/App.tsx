import React, { lazy, Suspense } from "react";
import { Counter } from "./Counter";
const HeavyComponent = lazy(() => import("./HeavyComponent"));

export const App = () => {
  return (
    <div id="root">
      <h1>Test suspense</h1>
      <Suspense fallback={<h3>Carregando...</h3>}>
        <HeavyComponent />
      </Suspense>
      <Counter />
    </div>
  );
};
