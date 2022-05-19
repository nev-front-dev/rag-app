import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
      rating
      language
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Poster = styled.div`
background-image: url(${(props) => props.bg});
  width: 25%;
  height: 60%;
  background-color: transparent;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 28px;
`;

export default function Details() {
  const { id } = useParams();
  const { data } = useQuery(GET_MOVIE, {
    variables: { id },
  });
  return (
    <Container>
      <Column>
        <Title>{data?.movie?.title}</Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}/>
    </Container>
  );
};
