import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HeaderContainer, Logo, ChangingData, Statistics } from "./Header.styles";

function Header() {
  const message = useSelector((state: RootState) => state.ui.headerMessage);
  const swaps = useSelector((state: RootState) => state.array.swaps);
  const comparisons = useSelector(
    (state: RootState) => state.array.comparisons
  );

  return (
    <HeaderContainer>
      <Logo>{message}</Logo>
      <Statistics>
        <Logo>
          Swaps: <ChangingData>{swaps}</ChangingData>
        </Logo>
        <Logo>
          Comparisons: <ChangingData>{comparisons}</ChangingData>
        </Logo>
      </Statistics>
    </HeaderContainer>
  );
}

export default Header;
