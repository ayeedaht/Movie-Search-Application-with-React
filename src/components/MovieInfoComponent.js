import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";

// Styled-components to write CSS in Javascript
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

// Styled-components to write CSS in Javascript
// Apply for the Movie image when it pop-up description
const CoverImage = styled.img`
  object-fit: cover;
  height: 450px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

// Styled-components to write CSS in Javascript
// Apply for Movie name
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;

// Styled-components to write CSS in Javascript
// Apply for the movie details when it pop-up description
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

// Styled-components to write CSS in Javascript
// Apply for the Close button when it pop-up description
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 10%;
  cursor: pointer;
  opacity: 0.8;
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`,
    ).then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    // Containing details about the movie, such as the title, rating, year, language, etc. 
    // The details are displayed using styled components such as MovieName, MovieInfo, and Close.
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          {/* InfoColumn containing details about the movie, such as the title, rating, year, language, etc.  */}
          <InfoColumn> 
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDb Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>

          {/* Sets the selectedMovie state to null, thus closing the movie information component. */}
          <Close onClick={() => props.onMovieSelect()}>Close</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;