import React from 'react';
import axios from 'axios';
import Menu from './Menu';

class Upload extends React.Component {
    constructor() {
        super();
        this.state = {
            data: 'No data',
            btnActive: false,
            count: 0
        };
    }

    componentDidMount() {
        axios.get(`${this.props.uri_back}/cv/count`)
        .then((res) => {
            console.log(res.data);
            this.setState({ count: res.data });
        });
    }

    showFile = async (event) => {
        event.preventDefault();
        const reader = new window.FileReader();
        reader.onload = async (e) => {
            let text = (e.target.result);
            text = JSON.stringify(JSON.parse(text), undefined, 4);
            this.setState({ data: text });
        };
        reader.readAsText(event.target.files[0]);
    }

    importCV = (e) => {
        e.preventDefault();
        let data = {};
        if (this.state.data.length !== 0 && this.state.data.length >= 100 && this.state.data !== 'No data') {
            data = JSON.parse(this.state.data);
            data.basics.user_id = this.state.count + 1;
            console.log(data);
            axios.post(`${this.props.uri_back}/cv/add`, data)
                .then((res) => {
                    this.setState({ data: 'OK' });
                    console.log(res);
                });
        }
    }

    dataChange = (e) => {
        this.setState({ btnActive: true, data: e.target.value });
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Menu active="import" />
                <div style={{ marginTop: '100px' }}>
                    <input type="file" onChange={(e) => this.showFile(e)} />
                </div>
                <form style={{ marginTop: '70px', width: '100%' }} onSubmit={this.importCV} className="container">
                    <div className="form-group">
                        <textarea className="form-control" onChange={this.dataChange} style={{ width: '100%', height: '60vh' }} value={this.state.data}>{'No data'}</textarea>
                    </div>
                    <div className="form-group">
                    {
                        this.state.btnActive === true ? (
                            <button className="btn btn-success" type="submit">{'Importer mon CV'}</button>
                        ) : (
                                <button className="btn btn-success" type="submit" disabled>{'Importer mon CV'}</button>
                            )
                    }
                    </div>
                </form>
            </div>
        );
    }
}

export default Upload;
