import styled from "styled-components";

export const Container = styled.div``;

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

export const HelpIcon = styled.div``;

export const Dot = styled.div`
  width: 3px;
  height: 3px;
  background-color: #fff;
  border-radius: 3px;
  margin-left: 8px;
  margin-right: 8px;
`;

export const Description = styled.span`
  display: flex;
  align-items: center;
`;

export const TextDescription = styled.span`
  font-size: 11px;
`;

export const Modal = styled.div`
  display: block;
  background-color: #3e3d40ba;
  display: flex;
  justify-content: center;
  align-items: center;
  hr {
    color: red;
  }
  .modal-dialog {
    margin: 0;
    width: 100%;
    transition: all 3s;
    .modal-content {
      background-color: #343a40;
      transition: all 3s;
      .modal-footer {
        transition: all 3s;
        border-top-color: #222427;
      }
      .modal-header {
        transition: all 3s;
        border-bottom-color: #222427;
      }
      .modal-title {
        .observation {
          font-size: 11px;
          padding: 6px;
        }
        .observation-button {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          svg {
            font-size: 16px;
            margin-left: 8px;
          }
        }
      }
    }
  }
`;
