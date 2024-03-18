import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 280px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transition: .4s;
  background: #fff;
  &:hover { 
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transform: translate(0px, -8px);
  }
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieCoponent = (props) => {
    const { Title, Year, imdbID, Type, Poster } = props.movie;
    // `onMovieSelect` as a parameter which is called when the user clicks on the movie card
    return (<MovieContainer onClick={() => props.onMovieSelect(imdbID)}> 
        {/* Display movie poster with Movie name, yesr, and Movie type [Eg. movie, Series, Game] */}
        <CoverImage src={Poster} /> 
        <MovieName>{Title}</MovieName>
        <InfoColumn>
            <MovieInfo>Year : {Year}</MovieInfo>
            <MovieInfo>Type : {Type}</MovieInfo>
        </InfoColumn>
    </MovieContainer>
    );
};

export default MovieCoponent;