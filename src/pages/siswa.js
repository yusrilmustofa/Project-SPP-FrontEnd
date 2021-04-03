import React, { Component } from "react";
import Navbar from "../Components/Navbar"
import ListSiswa from "../Components/ListSiswa"
import {base_url} from "../config"
import $ from 'jquery'
import axios from 'axios'
export default class Siswa extends Component {
    constructor() {
        super()
        this.state = {
            siswa:[],
            nisn:0,
            nis:0,
            nama:"",
            id_kelas:0,
            alamat:"",
            no_telp:0,
            id_spp:0,
            token:"",
            action:""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        }else{
            window.location ="/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig =() =>{
        let header = {
            headers:{Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getSiswa = () =>{
        let url = base_url + "/siswa"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({siswa:response.data.data})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getSiswa()
    }
    Add = () =>{
        $("#modal_siswa").modal("show")
        this.setState({
            action:"insert",
            nisn:0,
            nis:0,
            nama:"",
            id_kelas:0,
            alamat:"",
            no_telp:0,
            id_spp:0
        })
    }
    Edit = selectedItem =>{
        $("#modal_siswa").modal("show")
        this.setState({
            action:"update",
            nisn:selectedItem.nisn,
            nis:selectedItem.nis,
            nama:selectedItem.nama,
            id_kelas:selectedItem.id_kelas,
            alamat:selectedItem.alamat,
            no_telp:selectedItem.no_telp,
            id_spp:selectedItem.id_spp
        })
    }
    saveSiswa = event =>{
        event.preventDefault()
        $("#modal_siswa").modal("hide")
        let form = new FormData()
        form.append("nisn",this.state.nisn)
        form.append("nis",this.state.nis)
        form.append("nama",this.state.nama)
        form.append("id_kelas",this.state.id_kelas)
        form.append("alamat",this.state.alamat)
        form.append("no_telp",this.state.no_telp)
        form.append("id_spp",this.state.id_spp)

        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url,form,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }else if (this.state.action === "update") {
            axios.put(url,form,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }
    Drop = selectedItem =>{
        if (window.confirm("Are you sure Delete Thiss?")) {
            let url = base_url + "/siswa/" + selectedItem.nisn
            axios.delete(url,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">List Siswa</h3>
                    <div className="row">
                        { this.state.siswa.map(item => ( 
                            <ListSiswa 
                            nisn ={item.nisn}
                            nis = {item.nis}
                            nama ={item.nama}
                            id_kelas={item.id_kelas}
                            alamat ={item.alamat}
                            no_telp ={item.no_telp}
                            id_spp ={item.id_spp}
                            onDrop = {()=> this.Drop(item)}
                            onEdit ={()=> this.Edit(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-primary form-control" onClick={()=> this.Add()}>
                        Tambah Siswa
                    </button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="modal_siswa">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4> Form Siswa</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev =>this.saveSiswa(ev)}>
                                    NISN:
                                    <input type="number" className="form-control mb-1"
                                    value={this.state.nisn} onChange={ev =>this.setState({nisn:ev.target.value})}
                                    required />

                                    Nama Siswa:
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.nama} onChange={ev =>this.setState({nama:ev.target.value})}
                                    required />
                                    
                                    Nis Siswa:
                                    <input type="number" className="form-control mb-1"
                                    value={this.state.nis} onChange={ev =>this.setState({nis:ev.target.value})}
                                    required />

                                    Kelas:
                                    <input type="number" className="form-control mb-1"
                                    value={this.state.id_kelas} onChange={ev =>this.setState({id_kelas:ev.target.value})}
                                    required />

                                    Alamat:
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.alamat} onChange={ev =>this.setState({alamat:ev.target.value})}
                                    required />

                                    Telepon:
                                    <input type="number" className="form-control mb-1"
                                    value={this.state.no_telp} onChange={ev =>this.setState({no_telp:ev.target.value})}
                                    required />

                                    SPP:
                                    <input type="number" className="form-control mb-1"
                                    value={this.state.id_spp} onChange={ev =>this.setState({id_spp:ev.target.value})}
                                    required />

                                    <button className="btn btn-primary btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}