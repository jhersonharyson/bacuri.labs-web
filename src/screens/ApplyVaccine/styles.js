import styled, { css, keyframe } from "styled-components";

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
  background-color: #1c1f2b;
  justify-content: center;
  align-items: center;
  hr {
    color: red;
  }
  .modal-dialog {
    margin: 0;
    width: 100%;
    transition: all 0.3s;
    .modal-content {
      background-color: #343a40;
      transition: all 3s;
      .modal-footer {
        transition: all 3s;
        border-top-color: #222427;
        justify-content: flex-end;
        display: flex;
        width: 100%;
      }
      .modal-header {
        transition: all 3s;
        border-bottom-color: #222427;
        padding-bottom: 4px;
        padding-top: 4px;
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

  .card {
    position: absolute;
  }

  .close {
    font-size: 24px;
    align-self: flex-start;
    margin-left: 16px;
    margin-top: 5px;
  }

  .detail {
    align-self: flex-start;
    margin-left: 16px;
    margin-top: 8px;
    flex: 1;

    .apply-divisor {
      display: flex;
      flex: 1;
      width: 100%;
    }

    .apply {
      border: 1px solid #fff;
      border-radius: 50px;
      width: 50px;
      height: 50px;
      transition: 0.6s;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        display: none;
      }

      :hover {
        width: 130px;
        span {
          display: block;
          color: #fff;
          font-size: 18px;
        }
      }

      svg {
        color: #fff;
        font-size: 24px;
      }
    }
  }

  .header {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    width: 100%;
    background-color: #3c3c3c;
  }

  .footer {
    transition: all 3s;
    justify-content: flex-end;
    display: flex;
    width: 100%;
    transition: all 3s;
    background-color: #2b2a2a;
    border-top: 1px solid #222427;
  }

  .body {
    background-color: #1e1e1e;
    color: #cccccc;
    width: 100%;
    display: flow-root;
    flex: 8;
    padding-left: 90px;
    padding-right: 90px;
    padding-top: 24px;

    h4 {
      display: flex;
      margin-bottom: 20px;
      svg {
        margin-right: 8px;
      }
    }

    ul {
      svg {
        font-size: 16px;
        margin-right: 8px;
      }
    }

    .generate-code {
      width: 100%;
    }
  }

  .progress {
    height: 5px;
  }

  .qrcode-cancel {
    width: 100%;
  }

  .qrcode-area {
    padding: 6px;
    border-radius: 8px;
    width: 134px;
    height: 140px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 72px;
    }
  }
  .divisor {
    border: 1px solid #fff;
    margin-top: -4px;
    width: 100%;
    height: 0px;
    align-self: center;
  }

  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: ${({ show }) => (show ? "0" : "100vw")};
  transition: 0.6s;
  z-index: 100000;
`;
