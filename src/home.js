import React from 'react'
import Logo from './img/logicalis.png'
import DownArrow from './img/icons_white_RGB_Magnifying.png'
import TopArrow from './img/icons_white_RGB_Magnifying_d.png'
import DownMenu from './img/Icons_black_RGB_Magnifying2.png'
import TopMenu from './img/Icons_black_RGB_Magnifying3.png'
import { browserHistory } from "react-router";
import { Card, Row, CardTitle, Spinner } from 'reactstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      dash: []
    };
  }
  componentDidMount() {
    setTimeout(function(){
      var iframe = document.getElementById("iframet");
      var elmnt = iframe.contentWindow.document.getElementsByTagName("H1")[0];
      elmnt.style.display = "none";
    }, 20000)

    if (localStorage.getItem('login') === null) {
      browserHistory.push('/');
    } else {
      document.getElementById('hello').innerText = "Olá " + localStorage.getItem('name')
      const listarFolder = async () => {
        const response = await fetch(`http://localhost:5000/dashs`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
          })
        }).then(function (data) {
          return data.json();
        })
        const folders = await response
        this.setState({ folders })
        try {
          document.getElementById('spinner').style.display = 'none'
        } catch (error) {
          console.log(error)
        }
      }
      listarFolder();
      browserHistory.push('/home');
    }
  }

  Logout() {
    localStorage.clear()
    browserHistory.push('/');
  }

  ShowMenu() {
    try {
      let menuL = document.getElementById('MenuLeft')
      if (menuL.style.marginLeft === '-50%') {
        menuL.style.marginLeft = '0%'
        document.getElementById('Conteudo').style.width = '83%'
        document.getElementById('IconShowMenu').src = DownMenu
        document.getElementById('tampaLateral').style.width = '7%'
      } else {
        menuL.style.marginLeft = '-50%'
        document.getElementById('Conteudo').style.width = '100%'
        document.getElementById('IconShowMenu').src = TopMenu
        document.getElementById('tampaLateral').style.width = '6%'
      }
    } catch (error) {

    }

  }

  drop = id => () => {
    console.log(document.getElementsByClassName('sidemenu'))
    let ul = document.getElementById(id[0])
    if (ul.style.display === 'none' || ul.style.display === '') {
      ul.style.display = 'block'
      document.getElementById(id[0] + 'Seta').src = TopArrow
    } else {
      ul.style.display = 'none'
      document.getElementById(id[0] + 'Seta').src = DownArrow
    }
  }

  panel = dash => () => {
    dash[0].orgId = dash[1]
    dash = [dash[0]]
    this.setState({ dash: dash })
  }

  render() {
    return (
      <div>
        <div id='page' className="BasePage col-100">
          <div className="col-100 row-20 menuTop">
            <img
              src={Logo}
              style={{ width: "13%", paddingTop: "1%", paddingLeft: "1%", float: 'left' }}
              className="d-inline-block align-top"
              alt="Logicalis Logo"
            />
            <div style={{ width: '4%', float: 'left' }}>
              <a className="iconMenu" onClick={this.ShowMenu}>
                <img
                  id='IconShowMenu'
                  src={DownMenu}
                  style={{ width: "100%" }}
                />
              </a>
            </div>
            <h1 className='logout' aria-label="Sair" onClick={this.Logout}>sair</h1>
            <h3 id="hello" className='hello'></h3>
          </div>

          <div id='MenuLeft' className="MenuLateral col-17">
            {this.state.folders.map((dynamicData) => (
              <div style={{ width: '100%', background: '#2f353a' }}>
                <div className='BaseMenu'>
                  <div className='menuTitle' onClick={this.drop([dynamicData.id, dynamicData.dbs])}>
                    {dynamicData.title}
                  </div>
                  <div style={{ width: '20%' }}>
                    <img
                      id={dynamicData.id + 'Seta'}
                      src={DownArrow}
                      className="ViewIcon"
                      alt="React Bootstrap logo"
                      onClick={this.drop([dynamicData.id, dynamicData.dbs])}
                    />
                  </div>
                </div>
                <ul id={dynamicData.id} className='ContDash'>
                  {dynamicData.dbs.map((data) => (
                    <li className="menuLink" id={data.title} onClick={this.panel([data, dynamicData.orgId])} >{data.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div id='Conteudo' className="BaseConteudo col-83">
            <div id='spinner' className='containerSpinner'>
              <Spinner className="box" />
            </div>
            {this.state.dash.map((data) => (
              <div className="col-100 rows-100 ContRelatorio">
                <Row style={{ width: "100%", float: "left" }}>
                  <Card body>
                    <iframe id="iframet" style={{ border: 'none' }} src={'http://52.247.64.71' + data.url + '?orgId=' + data.orgId + '&refresh=3m'} height="500"></iframe>
                    <div id='tampaLateral' className='tampaLateral'>
                    </div>
                    <div id='tampaSuperior' className='tampaSuperior'>
                      <center>
                        <CardTitle style={{ fontSize: "250%" }}>{data.title}</CardTitle>
                      </center>
                    </div>
                  </Card>
                </Row>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default Home;