import styled from 'styled-components';
import img from '../../assets/background.jpg';

export const Info = styled.div`
  margin: 5% 25% 0 25%;
  text-align: center;

  h3:hover{
    color:green
  }

  text:hover{
    font-weight: bold;
  }
`;

export const FormGroup = styled.div`
  background-size: cover;
  background-position: center;
  margin-top: 5%;
  margin-left: 25%;
  margin-right: 25%;
  width: 50%;
  position: relative;
  font-size: 1em;
  background-image: url(${img});
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.13);

  input {
    background-color: rgb(250, 241, 230);
    height: 3vh;
    width: 80%;
    padding: 3% 0 3% 20%;
    border: none;
    border-radius: 3px;
    font-size: 2vh;
    color: #333;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .flag-icon {
    width: 8%;
    margin-right: 10px;
  }

  .flag-icon:hover{
    opacity: 0.7;
  }

  span:hover{
    font-weight: bold;
  }

  #uk {
    position: absolute;
    left: 3vw;
    top: 27%;
    transform: translateY(-50%);
  }

  #pl {
    position: absolute;
    left: 3vw;
    top: 79%;
    transform: translateY(-50%);
  }

  span {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2vh;
    color: #333;
  }

  #first {
    top: 27%;
  }

  #second {
    top: 79%;
  }

  @media screen and (max-width: 768px) {
    width: 70%;
    margin: 5% 15% 0 15%;
  }

  @media screen and (max-width: 576px) {
    width: 80%;
    margin: 5% 10% 0 10%;
  }
`;