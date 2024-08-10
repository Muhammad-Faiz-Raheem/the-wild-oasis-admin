import React from "react";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const StyledSelectCabin = styled.div`
  position: absolute;
  top: 18%;
  left: 7%;
  padding: 50px;
  background-color: var(--color-grey-500);
  border-radius: 20px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 100px 50px 100px 100px 100px;
  grid-template-rows: 20px;
  column-gap: 20px;
  color: var(--color-grey-900);
  font-weight: bolder;
  margin-bottom: 10px;
  background-color: var(--color-silver-100);
  padding: 5px 0 5px 10px;
  border-radius: 5px;
`;

const Li = styled.li`
  font-weight: bold;
  display: grid;
  grid-template-columns: 100px 50px 100px 100px 100px;
  column-gap: 20px;
  padding: 2px;
  margin-bottom: 5px;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-grey-300);

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }
`;

const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: translateX(-7px);
`;

/* eslint-disable react/prop-types */

function SelectCabin({ cabins, handleCabin }) {
  const ref = useOutsideClick(handleCabin);

  return (
    <StyledSelectCabin ref={ref}>
      <Header>
        <span></span>
        <span>name</span>
        <span>Max Capacity</span>
        <span>Regular Price</span>
        <span>Discount</span>
      </Header>
      <ul>
        {cabins.map((cabin) => (
          <Cabin cabin={cabin} key={cabin.id} handleCabin={handleCabin} />
        ))}
      </ul>
    </StyledSelectCabin>
  );

  function Cabin({ cabin, handleCabin }) {
    return (
      <Li onClick={() => handleCabin(cabin.id)}>
        <Img src={cabin.image} />
        <span>{cabin.name}</span>
        <span>{cabin.maxCapacity}</span>
        <span>{cabin.regularPrice}</span>
        <span>{cabin.discount}</span>
      </Li>
    );
  }
}

export default SelectCabin;
