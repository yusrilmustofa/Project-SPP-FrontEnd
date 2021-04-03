import React from "react"
import Navbar from "../Components/Navbar"
import axios from 'axios'
import {base_url} from '../config'
export default class Home extends React.Component{
    constructor(){
        super()
        this.state ={
            token:"",
            petugasName: null,
            siswaCount:0,
            kelasCount:0,
            petugasCount:0,
            sppCount:0,
            pembayaranCount:0
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        }else{
            window.location ="/login"
        }
    }
    headerConfig =()=>{
        let header ={
            headers:{Authorization:  `Bearer ${this.state.token}`}
        }
        return header
    }
    getSiswa = () =>{
        let url = base_url + "/siswa"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({siswaCount:response.data.data.length})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getPetugas = () =>{
        let url = base_url + "/petugas"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({petugasCount:response.data.length})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({kelasCount:response.data.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({sppCount: response.data.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({pembayaranCount: response.data.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getPetugass=() =>{
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        this.setState({petugasName:petugas.nama_petugas})
    }
    componentDidMount(){
        this.getKelas()
        this.getPembayaran()
        this.getSiswa()
        this.getSpp()
        this.getPetugas()
        this.getPetugass()
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-3">
                        <strong>Welcome Back,{this.state.petugasName}</strong>
                    </h3>
                    <div className="row">
                        {/* Siswa Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-12">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>Siswa Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.siswaCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* Kelas Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-12">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Kelas Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.kelasCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* Petugas Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-12">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Petugas Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.petugasCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* pembayaran Count */}
                        <hr />
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-12">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Transaksi Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.pembayaranCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* SPP Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-12">
                            <div className="card">
                                <div className="card-body bg-primary">
                                    <h4 className="text-dark">
                                        <strong>SPP Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.sppCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
