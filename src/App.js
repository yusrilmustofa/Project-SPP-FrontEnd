import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Siswa from './pages/siswa'
import Kelas from "./pages/kelas"
import Petugas from "./pages/petugas"
import Pembayaran from "./pages/pembayaran"
import SPP from "./pages/spp"




export default class App extends Component{
  render(){
    return(
      <Switch>
        <Route exact path ="/" component={Home} />
        <Route exact path ="/login" component={Login} />
        <Route exact path ="/siswa" component={Siswa} />
        <Route exact path ="/kelas" component={Kelas} />
        <Route exact path ="/petugas" component={Petugas} />
        <Route exact path ="/pembayaran" component={Pembayaran} />
        <Route exact path ="/spp" component={SPP} />
      </Switch>
    )
  }
}
