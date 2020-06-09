import React from 'react'
import { Button } from 'react-bootstrap';
import Logo from './img/logicalis.png'
import { browserHistory } from "react-router";

class LoginPage extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('login') !== null) {
      localStorage.clear()
    }
  }

  async Auth() {
    try {
      const login = document.getElementById("login").value
    const password = document.getElementById("password").value
    let user = await fetch(`http://localhost:5000/auth`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: login, password: password })
    }).then(function (data) {
      return data.json();
    })
    if (user.id != null) {
      localStorage.setItem("id", user.id)
      localStorage.setItem("name", user.name)
      localStorage.setItem("email", user.email)
      localStorage.setItem("login", user.login)
      localStorage.setItem("password", password)
      browserHistory.push('/home');
    }      
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="Card-auth">
        <hr style={{ background: 'red' }} />
        <div className=" formUser  rows-100">
          <center>
            <img
              src={Logo}
              style={{ width: "50%", paddingTop: "1%" }}
              className="d-inline-block align-top"
              alt="Logicalis Logo"
            />
          </center>
          <div>
            <br></br>
            <center>
              <h1 style={{ fontSize: '1.8rem' }}>Entrar</h1>
            </center>
            <label htmlFor="EmailInput"></label>
            <input type="text" className="border-none form-control" id="login" placeholder="E-mail ou Usuário" />
            <small id="emailHelp" className="form-text text-muted"></small>

            <label htmlFor="PasswordInput"></label>
            <input type="password" className="form-group border-none form-control" id="password" placeholder="Senha" />
            <i className="" alt="Senha" />

          </div>

          <div>
            <Button variant="success" onClick={this.Auth}>Enviar</Button>{' '}
            <i className="HelpButton">Esqueceu a senha</i>
            <small id="cardHelp" className="form-text text-muted text-center"></small>
          </div>
        </div>
        <hr style={{ background: 'red' }} />
      </div>
    )
  }
}
export default LoginPage;