import { keyframes, css } from "styled-components";

export const spinnerAnimation = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

export const fadeInAnimation = keyframes`
  from {opacity: 0}
  to {opacity: 1}
`;

const likeBitAnimation = keyframes`
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
}
`;

export const renderLikeBitAnimation = css`
  animation: ${likeBitAnimation} 1s cubic-bezier(0.215, 0.61, 0.355, 1);
`;

export const renderFadeInAnimation = css`
  animation: ${ fadeInAnimation } .2s ease-in forwards;
`