import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: ${({theme}) => theme.mainColor};

  @media screen and (max-width: 500px) {
    height: 60px;
  }
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-style: italic;
  color: white;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    font-size: 1.7rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const Statistics = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 40px;

  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

export const ChangingData = styled.span`
  display: inline-block;
  width: 50px;
`;