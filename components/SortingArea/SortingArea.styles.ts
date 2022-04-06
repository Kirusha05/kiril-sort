import styled from "styled-components";

export const SortingBars = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 520px;
  padding: 30px 10px;
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

export const SortingBar = styled.div`
  width: 10px !important;
`;

export const SortingControls = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 850px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SortingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid ${({theme}) => theme.mainColor};
  color: ${({theme}) => theme.mainColor};
  font-size: 1.2rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  transition: 0.2s ease-out;
  border-radius: 5px;

  &:hover {
    background: ${({theme}) => theme.mainColor};
    color: white;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -5px;
`;

export const SliderTitle = styled.span`
  color: ${({theme}) => theme.mainColor};
  margin-bottom: 5px;
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  width: 150px;
  height: 10px;
  border-radius: 5px;
  background: #dfdfdf;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({theme}) => theme.mainColor};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({theme}) => theme.mainColor};
  }
`;
