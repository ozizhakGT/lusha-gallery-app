import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import {renderFadeInAnimation, spinnerAnimation} from "../../styles/animations";
import colors from "../../styles/colors";

const StyledLoaderWrapper = styled.div`
  width: 100vw;
  
  .spinner {
    opacity: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    display: inline-block;
    transform: translate(-50%, -50%);
    ${renderFadeInAnimation}
    
    & > div {
      display: inline-block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      background: ${colors.blue2};
      animation: ${spinnerAnimation} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
  }
`;

export default function LoaderWrapper({ isLoading, children }) {

  return (
    <StyledLoaderWrapper>
      {isLoading
        ?
        <div className="spinner"><div/></div>
        :
        <>
          {children}
        </>
      }
    </StyledLoaderWrapper>
  )
}

LoaderWrapper.propTypes = {
  isLoading: propTypes.bool.isRequired,
  children: propTypes.node
};

LoaderWrapper.defaultProps = {
  isLoading: true
};