import React, { Component } from 'react'

export default class ListKelas extends Component {
    render() {
        return (
            <div className="col-lg-4 col-sm-4 p-1">
                <div className="card bg-warning">
                    <div className="card-body row">
                        <div className="col-7">
                            {/* Deskripsi */}
                            <h5 className="text-info">
                                ID:{this.props.id_kelas}
                            </h5>
                            <h6 className="text-success">
                                Nama Kelas:<b className="text-primary">{this.props.nama_kelas}</b>
                            </h6>
                            <h6 className="text-danger">
                                Kompentensi Keahlian:{this.props.kompetensi_keahlian}
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
        )
    }
}