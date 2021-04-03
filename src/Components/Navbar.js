import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Navbar extends Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("petugas")
        window.location = "/login"
    }
    render() {
        return (
            <div className="navbar navbar-expand-lg bg-primary navbar-light">
                <a className="navbar-brand">
                    <br />
                    <h4> Pembayaran SPP</h4>
                </a>
                {/* Show and Hide Menus */}
                <button className="navbar-toggler" data-toggle="collapse"
                    data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <h5>
                                    <br />
                                    <hr />
                                Home
                                <hr />
                                </h5>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/siswa" className="nav-link">
                                <h5>
                                    <br />
                                    <hr />
                                Data siswa
                                <hr />
                                </h5>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kelas" className="nav-link">
                                <h5>
                                    <br />
                                    <hr />
                                Data Kelas
                                <hr />
                                </h5>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/petugas" className="nav-link">
                                <h5>
                                    <br />
                                    <hr />
                                Data Petugas
                                <hr />
                                </h5>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pembayaran" className="nav-link">
                                <h5>
                                    <br />
                                    <hr />
                                Transaksi
                                <hr />
                                </h5>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/spp" className="nav-link">
                                <h5>
                                    <br />
                                    <hr />
                                SPP
                                <hr />
                                </h5>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                            <h5>
                                <br />
                                <hr />
                                Logout
                                <hr />
                                </h5>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}
export default Navbar;