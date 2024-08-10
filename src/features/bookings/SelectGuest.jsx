import React from "react";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const StyledSelectCabin = styled.div`
  position: absolute;
  top: 10%;
  left: -6%;
  padding: 50px;
  background-color: var(--color-grey-500);
  border-radius: 20px;
  max-height: 80vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* Make the track transparent */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-200); /* Initially transparent thumb */
    border-radius: 10px; /* Optional: Make the thumb rounded */
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 100px 200px 200px 100px 100px;
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
  grid-template-columns: 100px 200px 200px 100px 100px;
  column-gap: 20px;
  padding: 2px;
  margin-bottom: 5px;
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

function SelectUser({ guests, handleGuest }) {
  const ref = useOutsideClick(handleGuest);

  return (
    <StyledSelectCabin ref={ref}>
      <Header>
        <span>Flag</span>
        <span>Full Name</span>
        <span>Email</span>
        <span>National ID</span>
        <span>Nationality</span>
      </Header>
      <ul>
        {guests.map((guest) => (
          <Cabin guest={guest} key={guest.id} handleGuest={handleGuest} />
        ))}
      </ul>
    </StyledSelectCabin>
  );

  function Cabin({ guest, handleGuest }) {
    return (
      <Li onClick={() => handleGuest(guest.id)}>
        <Img src={guest.countryFlag} />
        <span>{guest.fullName}</span>
        <span>{guest.email}</span>
        <span>{guest.nationalID}</span>
        <span>{guest.nationality}</span>
      </Li>
    );
  }
}

export default SelectUser;
