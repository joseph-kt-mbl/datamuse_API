import React, { useState, useEffect } from "react";
import styled from "styled-components";

import './SearchForm.css';
import Word from './Word.jsx';

const BoardContainer = styled.section`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: .5rem;
    margin: 0.75rem;
    background-color: transparent;
    max-width: 900px;
    min-width: 300px;
    height: 100%;
`;

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  width: 800px;
  padding: 0.75rem;
  margin: 0.25rem;
  position: relative;
  height: 350px;
  overflow-y:scroll;
    
    &::-webkit-scrollbar-track {
    background-color: #0a0a0a; /* Light gray track background */
    border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #3ab521; /* Green thumb */
        border-radius: 10px; /* Rounded corners */
    }

    &::-webkit-scrollbar {
        width: 8px; /* Width of the vertical scrollbar */
        height: 8px; /* Height of the horizontal scrollbar */
    }
`;


const Title = styled.h2`
    text-decoration: underline;
    color: #f0f8ffd9;
    margin-left: 1.75rem;
`;

const KeyWord = styled.span`
    color: #44e125;
    text-decoration: dotted;
    font-size: smaller;
    margin-left: .5rem;
`;

function SearchBoard() {
  const [textArray, setTextArray] = useState([]);
  const [inputText, setInputText] = useState('');
  const [query, setQuery] = useState('something');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTextArray = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');
      const url = `https://api.datamuse.com/words?ml=${encodedQuery}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.map(item => item.word); // Extract the 'word' property from each object
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;  // Rethrow error to be caught by the caller
    }
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError('');
      fetchTextArray(query)
        .then(words => {
          setTextArray(words);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
          setError('Failed to fetch data');
          setLoading(false);
        });
    }
  }, [query]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearchButtonClick = (e) => {
    setQuery(inputText);
  };

  return (
    <BoardContainer>
      <div className="SearchForm">
        <div className="input__container">
          <input type="text" onChange={handleInputChange} placeholder="Search for a word or a meaning..." />
        </div>
        <button className="searchBtn" type="button" onClick={handleSearchButtonClick}>
          Search
        </button>
      </div>
      <Title>
        Words that are close in meaning to
        <KeyWord>{query}</KeyWord>:
      </Title>
      
      <WordsContainer>
       
        
        {loading > 0 ? <p>Loading...</p> : error ? <p>{error}</p> : textArray.map((data, index) => (
          <Word key={index} text={data} />
        ))}
  
      </WordsContainer>
     
    </BoardContainer>
  );
}

export default SearchBoard;
