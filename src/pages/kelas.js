import React, { Component } from 'react'
import Navbar from "../Components/Navbar"
import ListKelas from "../Components/ListKelas"
import { base_url } from "../config"
import $ from "jquery"
import axios from "axios"

export default class Kelas extends Component {
    constructor() {
        super()
        this.state = {
            kelas: [],
            action: "",
            token: "",
            id_kelas: 0,
            nama_kelas: "",
            kompetensi_keahlian: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ kelas: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount() {
        this.getKelas()
    }
    Add = () =>{
        $("#modal_kelas").modal("show")
        this.setState({
            action:"insert",
            id_kelas:"0",
            nama_kelas:"",
            kompetensi_keahlian:""
        })
    }
    Edit = selectedItem =>{
        $("#modal_kelas").modal("show")
        this.setState({
            action:"update",
            id_kelas:selectedItem.id_kelas,
            nama_kelas:selectedItem.nama_kelas,
            kompetensi_keahlian:selectedItem.kompetensi_keahlian
        })
    }
    saveKelas= event =>{
        event.preventDefault()
        $("#modal_kelas").modal("hide")
        let form = new FormData()
        form.append("id_kelas",this.state.id_kelas)
        form.append("nama_kelas",this.state.nama_kelas)
        form.append("kompetensi_keahlian",this.state.kompetensi_keahlian)

        let url = base_url + "/kelas"
        if (this.state.action === "insert") {
            axios.post(url,form,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        }else if (this.state.action === "update") {
            axios.put(url,form,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        }
    }
    Drop = selectedItem =>{
        if (window.confirm("Are you sure Delete Thiss?")) {
            let url = base_url + "/kelas/" + selectedItem.nisn
            axios.delete(url,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <di>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">List Kelas</h3>
                    <div className="row">
                        {this.state.kelas.map(item => (
                            <ListKelas
                                id_kelas={item.id_kelas}
                                nama_kelas={item.nama_kelas}
                                kompetensi_keahlian={item.kompetensi_keahlian}
                                onDrop={() => this.Drop(item)}
                                OnEdit={() => this.Edit(item)}
                            />
                        ))}
                    </div>
                    <br />
                    <button className="btn btn-primary btn-block form-control" onClick={() => this.Add()}>
                        Tambah Kelas
                    </button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="modal_kelas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h4 className="text-center" align="center">Form Kelas</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveKelas(ev)}>
                                    ID Kelas:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.id_kelas} onChange={ev => this.setState({ id_kelas: ev.target.value })}
                                        required />

                                    Nama Kelas:
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama_kelas} onChange={ev => this.setState({ nama_kelas: ev.target.value })}
                                        required />

                                    Mapel Keahlian:
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.kompetensi_keahlian} onChange={ev => this.setState({ kompetensi_keahlian: ev.target.value })}
                                        required />

                                    <button className="btn btn-primary btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </di>
        )
    }
}