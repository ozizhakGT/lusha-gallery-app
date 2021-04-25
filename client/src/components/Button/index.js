import styled from "styled-components";

export default styled.button`
  cursor: pointer;
  border: none;
  background-color: lightsteelblue;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 1.6rem;
  color: white;
  transition: .2s ease-in;
  backface-visibility: hidden;
  
  &:focus {
    outline: none;
  }
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: .4;
  }
`;