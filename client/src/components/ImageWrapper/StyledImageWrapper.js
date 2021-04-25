import styled from "styled-components";
import {renderLikeBitAnimation} from "../../styles/animations";

const colorLikeIcon = (({hasLiked}) => {
  debugger
  return hasLiked ? "red" : "white"
});

export default styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: url(${({ imgSrc }) => imgSrc}), linear-gradient(rgba(0,0,0, .3), rgba(0,0,0, .6));
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-position: center;
  border-radius: 5px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background .2s linear;

  .description,
  .likes-container {
    opacity: 0;
    transition: all .3s ease-out;
  }
  
  .description {
    text-align: center;
    font-size: 1.8rem;
    color: white;
    transform: translateY(-10px);
    transition-delay: .2s;
  }
  
  .likes-container {
    user-select: none;
    position: absolute;
    bottom: 15px;
    left: 20px;
    display: flex;
    align-items: center;
    color: white;
    transform: translateX(-5px);
    transition-delay: .4s;
    
    
    svg {
      cursor: pointer;
      width: 2rem;
      margin-right: 5px;
      color: ${colorLikeIcon};
      ${renderLikeBitAnimation}

      &:hover {
        transform: scale(1.03);
      }
      
      path {
        fill: ${colorLikeIcon};
      }
      
      &, path {
        transition: all .3s;
      }
    }
    
    span {
      font-size: 1.2rem;
    }
  }

  &:hover {
    background-size: 110% 110%;

    & > * {
      opacity: 1;
      transform: translate(0);
    }
  }
`;