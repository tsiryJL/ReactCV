import React from 'react';
import axios from 'axios';
import Menu from './Menu';

const s = '-';

const filterData = (d, search) => d.filter(x => x.basics.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);

class ListCV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_search: [],
            data: []
        };
    }

    componentDidMount() {
        axios.get(`${this.props.uri_back}/cv`)
            .then((res) => {
                console.log(res.data);
                this.setState({ data: res.data, data_search: res.data });
                const d = res.data;
                if (d[d.length - 1] !== undefined) {
                    window.sessionStorage.setItem('lastId', d[d.length - 1].basics.user_id);
                } else {
                    window.sessionStorage.setItem('lastId', '0');
                }
            });
    }

    search = e => {
        const data = this.state.data;
        if (e.target.value !== '') {
            const d = filterData(data, e.target.value);
            this.setState({ data_search: d });
        } else {
            this.setState({ data_search: data });
        }
    }

    render() {
        return (
            <div>
                <Menu active="home" />
                <div style={{ marginTop: '100px', width: '100%' }} className="container">
                    <input type="text" className="form-control w-25 mt-5" placeholder="Rechercher" onChange={this.search} />
                    <table className="table shadow mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th>{'oid'}</th>
                                <th scope="col">{'Nom et prenoms'}</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data_search.map((v) => (
                                    <tr>
                                        <td>{v.basics.user_id}</td>
                                        <td>{v.basics.name}</td>
                                        <td>
                                            <a href={`/#/${v.basics.name.split(' ')[0] + s + v.basics.name.split(' ')[1] + s + v.basics.user_id}`} rel="noopener noreferrer" target="_blank" className="btn btn-success">{'Voir'}</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListCV;
