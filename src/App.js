import React, { useState } from "react";
import Axios from "axios";
import styled from 'styled-components'
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = 'ba51d8db' // OMDb API

// Styled-components to write CSS in Javascript
// Apply for show the movie list as column
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// Styled-components to write CSS in Javascript
// Apply for the Nav bar above
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

// Styled-components to write CSS in Javascript
// Apply for movie image
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

// Styled-components to write CSS in Javascript
// Apply for App name in nav bar on the left side
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

// Styled-components to write CSS in Javascript
// Apply for Icon in search box
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

// Styled-components to write CSS in Javascript
// Apply for the search box
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 25%;
  background-color: white;
  align-items: center;
`;

// Styled-components to write CSS in Javascript
// Apply for User input text
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: 55%;
`;

// Styled-components to write CSS in Javascript
// Apply for show movie list in card
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

// Styled-components to write CSS in Javascript
// Apply for Text show on Search box befor user type
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() { // Called "App"

  // The updateTitleQuery, updateYearQuery, and updateTypeQuery functions 
  // used to update the corresponding state variables
  const [titleQuery, updateTitleQuery] = useState();  // titleQuery: stores the user's query for a movie title.
  const [yearQuery, updateYearQuery] = useState();    // yearQuery: stores the user's query for a movie release year.
  const [typeQuery, updateTypeQuery] = useState();    // typeQuery: stores the user's query for a movie type (e.g., "movie", "series", "episode").

  // timeoutId: stores the ID of a timeout that is used to 
  //delay the search until the user has stopped typing for a certain amount of time.
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]); // movieList: stores an array of movie objects retrieved from an API based on the user's query.
  const [selectedMovie, onMovieSelect] = useState(); // selectedMovie: stores the currently selected movie object. 
                                                     //  This can be updated using the onMovieSelect function.

  // Called to fetch the movie data based on the user's search queries
  const fetchData = async () => {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}`;

    if (titleQuery) {
      url += `&s=${titleQuery}`;
    }

    if (yearQuery) {
      url += `&y=${yearQuery}`;
    }

    if (typeQuery) {
      url += `&type=${typeQuery}`;
    }

    const response = await Axios.get(url); // response is assigned to the response variable
    updateMovieList(response.data.Search); // called with the Search property of the response data 
                                          // (which is an array of movies that match the search query).
  };

  // Called when the user types in the search Movie Title input fields
  const onTitleChange = (e) => {
    clearTimeout(timeoutId);  // Clear the current timeout using clearTimeout
    updateTitleQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500); //set a new timeout using setTimeout to wait for 500 milliseconds
    updateTimeoutId(timeout);                                         // before calling fetchData. This helps to reduce the number of API calls and improve performance.
  };

  // Called when the user types in the search Movie Release input fields
  const onYearChange = (e) => {
    clearTimeout(timeoutId);
    updateYearQuery(e.target.value);
    const timeout = setTimeout(() => {
      if (titleQuery) {
        fetchData(`${titleQuery}&y=${e.target.value}`);
      } else {
        fetchData(`&y=${e.target.value}`);
      }
    }, 500);
    updateTimeoutId(timeout);
  };
  
  // Called when the user types in the search Movie Type input fields
  const onTypeChange = (e) => {
    clearTimeout(timeoutId);
    updateTypeQuery(e.target.value);
    const timeout = setTimeout(() => {
      if (titleQuery) {
        fetchData(`${titleQuery}&type=${e.target.value}`);
      } else {
        fetchData(`&type=${e.target.value}`);
      }
    }, 500);
    updateTimeoutId(timeout);
  };

  return <Container>
    <Header>
      <AppName>
        <MovieImage src='/filmWhite.svg' />
        Movie Search App
      </AppName>

      {/* User search by Movie Title */}
      <SearchBox>
        <SearchIcon src='/search.svg' />
        <SearchInput
          placeholder='Search Movie Title...Eg. Star Trek'
          value={titleQuery}
          onChange={onTitleChange}
        />
      </SearchBox>

      {/* User search by Movie Release */}
      <SearchBox>
      <SearchIcon src='/calendar.svg' />
        <SearchInput
          placeholder="Release Year...Eg. 2019 / 2022"
          value={yearQuery}
          onChange={onYearChange}
        />
      </SearchBox>

      {/* User search by Movie Type */}
      <SearchBox>
      <SearchIcon src='/type.svg' />
        <SearchInput
          placeholder="Type by Movie, Series..."
          value={typeQuery}
          onChange={onTypeChange}
        />
      </SearchBox>

    </Header>

    {/* After Search movie and click on movie it will show the detail of movie
        after click close it will back to search page with movie you search before */}
    {selectedMovie && <MovieInfoComponent
      selectedMovie={selectedMovie}
      onMovieSelect={onMovieSelect} />}
    <MovieListContainer>
      {movieList?.length ? (
        movieList.map((movie, index) => (
          <MovieComponent
            key={index}
            movie={movie}
            onMovieSelect={onMovieSelect} // Close movie describtion
          />
        ))
      ) : (
        <Placeholder src="/filmBlack.svg" /> // Show Icon on the page
      )}
    </MovieListContainer>
  </Container>
}

export default App;
