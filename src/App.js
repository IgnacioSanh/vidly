import React from "react";
import "./App.css";
import Movie from "./components/movies";

function App() {
  return (
    <main className="container">
      <h1>Vidly Movie rental </h1>
      <h2>
        <i>Now on Github!!!</i>
      </h2>
      <Movie></Movie>
    </main>
  );
}

export default App;
