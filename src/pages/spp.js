import React, { Component } from 'react'
import Navbar from "../Components/Navbar"
import ListSPP from "../Components/ListSPP"
import $ from "jquery"
import axios from "axios"
import { base_url } from "../config"

export default class SPP extends Component {
    constructor() {
        super()
        this.state = {
            spp: [],
            token: "",
            action: "",
            id_spp: 0,
            tahun: 0,
            nominal: 0
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
    getSPP = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ spp: response.data.data })
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
        this.getSPP()
    }
    Add = () =>{
        $("#modal_spp").modal("show")
        this.setState({
            action:"insert",
            id_spp:0,
            tahun:0,
            nominal:0
        })
    }
    Edit = selectedItem =>{
        $("#modal_spp").modal("show")
        this.setState({
            action:"update",
            id_spp:selectedItem.id_spp,
            tahun:selectedItem.tahun,
            nominal:selectedItem.nominal
        })
    }
    saveSPP = event =>{
        event.preventDefault()
        $("#modal_spp").modal("hide")
        let form ={
            id_spp:this.state.id_spp,
            tahun:this.state.tahun,
            nominal:this.state.nominal
        }
        let url = base_url + "/spp"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSPP()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSPP()
                })
                .catch(error => console.log(error))
        }
    }
    Drop = selectedItem =>{
        if (window.confirm("Are you sure Delete Thiss?")) {
            let url = base_url + "/spp/" + selectedItem.nisn
            axios.delete(url,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getSPP()
            })
            .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-center mt-2">List SPP</h3>
                    <div className="row">
                        {this.state.spp.map(item => (
                            <ListSPP
                                id_spp={item.id_spp}
                                tahun={item.tahun}
                                nominal={item.nominal}
                                onDrop={() => this.Drop(item)}
                                onEdit={() => this.Edit(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-primary btn-block form-control" onClick={() => this.Add()}>
                        Tambah SPP
                    </button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="modal_spp">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4>Form SPP</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSPP(ev)}>
                                    ID SPP:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.id_spp} onChange={ev => this.setState({ id_spp: ev.target.value })}
                                        required />

                                        Tahun:
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.tahun} onChange={ev => this.setState({ tahun: ev.target.value })}
                                        required />

                                        Nominal:
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.nominal} onChange={ev => this.setState({ nominal: ev.target.value })}
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