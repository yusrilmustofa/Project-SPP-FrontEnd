import React, { Component } from 'react'

export default class ListPetugas extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-lg-12 col-sm-12 p-1">
                    <div className="card bg-success">
                        <div className="card-body row">
                            <div className="col-7">
                                <h5 className="">
                                    ID: {this.props.id_petugas}
                                </h5>
                                <h6 className="">
                                    Nama Petugas:{this.props.nama_petugas}
                                </h6>
                                <h6 className="">
                                    LEVEL: {this.props.level}
                                </h6>
                                <h6>
                                    Username: {this.props.username}
                                </h6>
                                {/* Button Edit */}
                                <button className="btn btn-sm btn-primary m-1" onClick={this.props.onEdit}>
                                    Edit
                            </button>

                                {/* Button Hapus */}
                                <button className="btn btn-sm btn-danger m-1" onClick={this.props.onDrop}>
                                    Delete
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}