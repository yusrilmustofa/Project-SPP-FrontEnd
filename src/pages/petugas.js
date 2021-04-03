import React, { Component } from 'react'
import Navbar from "../Components/Navbar"
import ListPetugas from "../Components/ListPetugas"
import $ from 'jquery'
import { base_url } from '../config'
import axios from "axios"
export default class Petugas extends Component {
    constructor() {
        super()
        this.state = {
            action: "",
            token: "",
            petugas: [],
            id_petugas: 0,
            nama_petugas: "",
            level: "",
            username: "",
            password: ""
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
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ petugas: response.data })
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
        this.getPetugas()
    }
    Add = () => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            nama_petugas: "",
            level: "",
            username: "",
            password: ""
        })
    }
    Edit = selectedItem => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            nama_petugas: selectedItem.nama_petugas,
            level: selectedItem.level,
            username: selectedItem.username,
            password: ""
        })
    }
    savePetugas = event => {
        event.preventDefault()
        $("#modal_petugas").modal("hide")
        let form = {
            id_petugas: this.state.id_petugas,
            nama_petugas: this.state.nama_petugas,
            level: this.state.level,
            username: this.state.username
        }
        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))
        }
    }
    Drop = selectedItem =>{
        if (window.confirm("Are you sure Delete Thiss?")) {
            let url = base_url + "/petugas/" + selectedItem.nisn
            axios.delete(url,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <di>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">List Petugas</h3>
                    <table className="table table-bordered bg-black">
                        <thead>
                            <tr>
                                <th>Id Petugas</th>
                                <th>Name</th>
                                <th>Level</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody >
                            {this.state.petugas.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.level}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm m-1"
                                            onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-danger btn-sm m-1"
                                            onClick={() => this.Drop(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary btn-block form-control" onClick={() => this.Add()}>
                        Tambah Petugas
                    </button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="modal_petugas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                Form Pengisian Petugas
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.savePetugas(ev)}>
                                    ID Petugas:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.id_petugas} onChange={ev => this.setState({ id_petugas: ev.target.value })}
                                        required />

                                    Nama Petugas:
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama_petugas} onChange={ev => this.setState({ nama_petugas: ev.target.value })}
                                        required />

                                    Level:
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.level} onChange={ev => this.setState({ level: ev.target.value })}
                                        required placeholder="Admin/Petugas" />
                                    Username:
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })}
                                        required />
                                    Password:
                                    <input type="password" className="form-control mb-1"
                                        value={this.state.password} onChange={ev => this.setState({ password: ev.target.value })}
                                         />
                                    {/*             
                                        
                                                      TAMBAH USERNAME DAN PASSWORD
                                    
                                        */}
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