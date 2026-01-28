import styled, { keyframes } from "styled-components";

// Keyframes for animation
const rotate = keyframes`  
  to {  
    transform: rotate(1turn);  
  }  
`;

// Styled component for the loader that accepts props for color and backgroundColor
const Loader = styled.div`
  width: 30px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${(props) => props.backgroundColor || "#f3802c"} !important;
  background-color: ${(props) => props.backgroundColor || "#f3802c"} !important;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: ${rotate} 1s infinite linear;
  color: ${(props) =>
    props.color || "#000"}; // This can affect text color if you add any

  &:hover {
    opacity: 1; // Ensure the opacity stays at 1 on hover
  }
`;

export default function LoadingCss({ color, backgroundColor }) {
  return <Loader color={color} backgroundColor={backgroundColor} />;
}
