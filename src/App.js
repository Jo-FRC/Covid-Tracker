import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.covidtracking.com/v1/us/daily.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='app'>
        <h1>Covid cases tracker</h1>
      <ul className='container'>
        {console.log(items)}
        
        {items.map((item, i) => (
          <li className='row' key={item.hash}>
            <div className='date'>Date: {item.dateChecked}</div>
            <div className='infections'>Number of infections: {item.positive}</div> 
            <div className='deaths'>Deaths: {item.death}</div>
          </li>
        ))}
      </ul>
      </div>
      
      
    );
  }
}

export default App;

