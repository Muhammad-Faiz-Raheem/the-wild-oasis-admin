import styled, { css } from "styled-components";

// const test = `
//   text-align: center;
// `;

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: white"}
// `;

// without props
// const Heading = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: white;
//   margin: 20px;
// `;

// with props
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 800;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 700;
    `}
  
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
  
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
  
  line-height: 1.4;
`;

export default Heading;
