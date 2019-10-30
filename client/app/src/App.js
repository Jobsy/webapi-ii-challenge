
import React, { useState, useEffect } from 'react';
import axios from "axios"
import './App.css';

function App() {

  const [state, setState] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/posts`)
      .then(response => {
        setState(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <>
        <h1>webapi-II-challenge App</h1>
        {state.map((post) => (
          <li>
            Title: {post.title},
          Content: {post.contents}
          </li>
        ))}
      </>
    </div>
  );
}

export default App;
