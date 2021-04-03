import React, { Component } from 'react'
import Navbar from "../Components/Navbar"
import { base_url } from "../config"
import axios from 'axios'
import $, { timers } from "jquery"

export default class Pembayaran extends Component {
    constructor() {
        super()
        this.state = {
            bayar: [],
            action: "",
            token: "",
            id_pembayaran: 0,
            id_petugas: 0,
            nisn: 0,
            tgl_bayar: 0,
            bulan: "",
            tahun_bayar: 0,
            id_spp: 0,
            jumlah_bayar: 0
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
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ bayar: response.data.data })
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
    Add = () => {
        $("#modal_transaksi").modal("show")
        this.setState({
            action:"insert",
            tgl_bayar: 0,
            bulan: "",
            tahun_bayar: 0,
            jumlah_bayar: 0,
            id_spp: 0,
            id_pembayaran: 0,
            id_petugas: 0
        })
    }
    Edit = selectedItem => {
        $("#modal_transaksi").modal("show")
        this.setState({
            tgl_bayar: selectedItem.tgl_bayar,
            bulan: selectedItem.bulan,
            tahun_bayar: selectedItem.tahun_bayar,
            jumlah_bayar: selectedItem.jumlah_bayar,
            id_spp: selectedItem.id_spp,
            id_pembayaran: selectedItem.id_pembayaran,
            id_petugas: selectedItem.id_petugas,
            action:"update"
        })
    }
    saveTransaksi = event =>{
        event.preventDefault()
        $("#modal_transaksi").modal("hide")
        let form ={
            id_pembayaran: this.state.id_pembayaran,
            id_petugas: this.state.id_petugas,
            tgl_bayar:this.state.tgl_bayar,
            bulan:this.state.bulan,
            tahun_bayar:this.state.tahun_bayar,
            jumlah_bayar:this.state.jumlah_bayar,
            id_spp:this.state.id_spp
        }
        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPembayaran()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPembayaran()
                })
                .catch(error => console.log(error))
        }
    }
    componentDidMount() {
        this.getPembayaran()
    }
    Drop = selectedItem =>{
        if (window.confirm("Are you sure Delete Thiss?")) {
            let url = base_url + "/pembayaran/" + selectedItem.nisn
            axios.delete(url,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-bold mt-2 text-center">List Transaksi</h3>
                    <table className="table table-bordered bg-black">
                        <thead>
                            <tr>
                                <th>Id Pembayaran</th>
                                <th>Id Petugas</th>
                                <th>Tgl Bayar</th>
                                <th>Bulan</th>
                                <th>Tahun</th>
                                <th>Jumlah Bayar</th>
                                <th>ID SPP</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bayar.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_pembayaran}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.tgl_bayar}</td>
                                    <td>{item.bulan}</td>
                                    <td>{item.tahun_bayar}</td>
                                    <td>{item.jumlah_bayar}</td>
                                    <td>{item.id_spp}</td>
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
                    <button className="btn btn-primary mb-1 form-control btn-block" onClick={() => this.Add()}>
                        Tambah Transaksi
                        </button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="modal_transaksi">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info">
                                Form Transaksi
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveTransaksi(ev)}>
                                    ID Pembayaran:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.id_pembayaran} onChange={ev => this.setState({ id_pembayaran: ev.target.value })}
                                        required />

                                    ID Petugas:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.id_petugas} onChange={ev => this.setState({ id_petugas: ev.target.value })}
                                        required />

                                    Tanggal Bayar:
                                    <input type="time" className="form-control mb-1"
                                        value={this.state.tgl_bayar} onChange={ev => this.setState({ tgl_bayar: ev.target.value })}
                                        required />

                                    Bulan Bayar:
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.bulan} onChange={ev => this.setState({ bulan: ev.target.value })}
                                        required />

                                    Tahun Bayar:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.tahun_bayar} onChange={ev => this.setState({ tahun_bayar: ev.target.value })}
                                        required />

                                    Jumlah:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.jumlah_bayar} onChange={ev => this.setState({ jumlah_bayar: ev.target.value })}
                                        required />

                                    Id SPP:
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.id_spp} onChange={ev => this.setState({ id_spp: ev.target.value })}
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