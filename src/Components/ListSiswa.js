import React,{Component} from  'react'

export default class ListSiswa extends Component{
    render(){
        return(
            <div className="col-lg-12 col-sm-12 p-1">
                <div className="card bg-info">
                    <div className="card-body row">
                        {/* Deskripsi */}
                        <div className="col-7">
                            <h5 className="">
                            NISN:{this.props.nisn}
                            </h5>
                            <h5 className="">
                              NIS:  {this.props.nis}
                            </h5>
                            <h5 className="">
                               Nama: {this.props.nama}
                            </h5>
                            <h6 className="">
                               Kelas: {this.props.id_kelas}
                            </h6>
                            <h6 className="">
                                Alamat: {this.props.alamat}
                            </h6>
                            <h6 className="">
                              Telp:  {this.props.no_telp}
                            </h6>
                            <h6 className="">
                               SPP: {this.props.id_spp}
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