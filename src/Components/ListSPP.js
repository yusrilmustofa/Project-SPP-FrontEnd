import React, { Component } from 'react'

export default class ListSPP extends Component {
    render() {
        return (
                <div className="col-lg-4 col-sm-4 p-1">
                    <div className="card bg-info">
                        <div className="card-body row">
                            <div className="col-6">
                                {/* Deskripsi */}
                                <h5>
                                    ID:{this.props.id_spp}
                                </h5>
                                <h6>
                                    Tahun:{this.props.tahun}
                                </h6>
                                <h6>
                                    Nominal:<h6 className="text-danger">{this.props.nominal}</h6>
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