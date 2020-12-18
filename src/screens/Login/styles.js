import styled from "styled-components";

export const Container = styled.form`
  &.login-card {
    padding: 32px 32px 0;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
    height: 100%;
  }

  .login-card-content {
    flex-grow: 2;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .login-card-footer {
    padding: 32px 0;
  }

  h2 .highlight {
    color: #fdc654;
  }

  h2 {
    font-size: 32px;
    margin: 0;
  }

  h3 {
    color: #fdc654;
    font-size: 14px;
    line-height: 18px;
    margin: 0;
  }

  .header {
    margin-bottom: 25px;
  }

  .logo {
    border-radius: 40px;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    margin: 0 auto 16px;
    background: rgba(255, 255, 255, 0.1);
    align-items: center;
    overflow: hidden;
    border: 10px solid #fff;
    background-color: #fff;
    box-shadow: 3px 5px 200px #bdbdb0a;
    margin-bottom: 4px;
    img {
      width: 100%;
    }
  }

  button,
  .loader-button {
    background: white;
    display: block;
    color: #fdc654;
    font-size: 16px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 40px;
    padding: 0;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 32px;
    outline: none;
    transition: all 0.2s;

    &:hover {
      background: #fdc654;
      color: #fff;
    }
  }

  .loader-button {
    padding: 0;
    padding-top: 8px;
  }

  .form-field {
    margin-bottom: 16px;
    width: 100%;
    position: relative;
  }

  .form-field .icon {
    position: absolute;
    background: white;
    color: #fdc654;
    font-size: 16px;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
    width: 40px;
    height: 40px;
    justify-content: center;
    border-radius: 20px;
  }

  .form-field .icon:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-left: 12px solid white;
    position: absolute;
    top: 8px;
    right: -20px;
  }

  .form-field input {
    text-transform: lowercase;
    z-index: 100;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
    border-radius: 24px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    outline: none;
    transition: all 0.2s;
    padding-left: 50px;
    padding-right: 50px;
    font-size: 16px;
  }

  .form-field input::placeholder {
    text-transform: capitalize;
    color: white;
    font-size: 16px;
  }

  .form-field.username,
  .form-field.password {
    display: flex;
    flex-direction: column;
  }

  .form-field input:hover,
  .form-field input:focus {
    // background: white;
    color: #fdc654;
    transition: all 0.2s;
    z-index: 100;
  }

  .form-field:hover {
    .icon {
      transition: all 0.2s;
      width: 280px;
    }
  }

  .form-field input:hover::placeholder {
    color: #fdc654;
    font-size: 16px;
  }

  & {
    background-image: linear-gradient(#c7ae30, #403939);
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    color: white;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    justify-content: center;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    outline: none;
    transition: all 0.2s;
  }

  a:hover,
  a:focus {
    color: #fdc654;
    transition: all 0.2s;
  }

  & {
    height: 100%;
  }
`;
