import React from "react";
import styled from "styled-components";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/images/logo.png";
import colors from "./styles/colors";
import Gallery from "./containers/Gallery";

const StyledApp = styled.div`
  .navbar {
    position: relative;
    width: 100%;
    height: 100px;
    padding: 0 4rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 20%);
    
    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;

      background-color: ${colors.blue};
      opacity: .6;
    }
    
    &-logo {
      width: 12rem;
    }
  }
`;

function App() {

  return (
    <StyledApp>
      <header className="navbar">
        <div className="navbar-overlay" />
        <img className="navbar-logo" src={logo} alt="Lusha Logo" />
      </header>

      <Gallery />
    </StyledApp>
  );
}

export default App;
