import styled from "styled-components";

const $bg = "#1b2431";
const $light_text = "#738297";
const $dark_text = "#273142";
const $light_bg = "#313d4f";

export const Container = styled.div`
  h4 .highlight {
    color: #fdc654;
  }

  .card-list {
    @include clear();
    width: 100%;
  }

  .card {
    border-radius: 8px;
    color: white;
    padding: 10px;
    position: relative;

    .zmdi {
      color: white;
      font-size: 28px;
      opacity: 0.3;
      position: absolute;
      right: 13px;
      top: 13px;
    }

    .stat {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      font-size: 8px;
      margin-top: 25px;
      padding: 10px 10px 0;
      text-transform: uppercase;
    }

    .title {
      display: inline-block;
      font-size: 8px;
      padding: 10px 10px 0;
      text-transform: uppercase;
    }

    .value {
      font-size: 28px;
      padding: 0 10px;
    }

    &.blue {
      background-color: #2298f1;
    }

    &.green {
      background-color: #66b92e;
    }

    &.orange {
      background-color: #da932c;
    }

    &.red {
      background-color: #d65b4a;
    }
  }
`;

export const DropdownMenu = styled.ul``;

export const Dropdown = styled.div`
  position: relative;
  &:hover ul {
    display: block;
    left: -340%;
  }
`;

export const DropdownButton = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  font-weight: bold;
`;
