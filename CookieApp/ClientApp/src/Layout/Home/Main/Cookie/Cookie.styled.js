import styled, { keyframes } from "styled-components";

export const CookieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const click = keyframes`
0%  { transform: translate(2px, 1px)   rotate(0deg);  }
40% { transform: translate(1px, -1px)  rotate(1deg);  }
50% { transform: translate(-1px, 2px)  rotate(-1deg); }
60% { transform: translate(-3px, 1px)  rotate(0deg);  }
100%{ transform: translate(1px, -2px)  rotate(-1deg); }`;

export const CookieButton = styled.button`
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  border-style: none;
  height: 300px;
  width: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  user-drag: none;

  &.shake {
    animation: ${click} 0.01s;
  }
`;

export const CookieQuantity = styled.p`
  margin: 0;
  font-size: 32px;
  font-family: serif;
  font-weight: 700;
`;

export const PerSecond = styled.p`
  margin-top: 0;
  font-size: 20px;
  font-family: serif;
  font-weight: 700;
`;

export const CookieImage = styled.img`
  height: 100%;
  width: 100%;
  z-index: 1;
  border-radius: 50%;
  user-drag: none;
`;

export const CookieLight = styled.div`
  box-shadow: rgb(255 255 255 / 56%) 0px 0 150px 40px;
  border: 0px;
  position: absolute;
  background-color: transparent;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;
