import React from 'react';
import Axios from 'axios';

import DeveloperProfile from './package';

const mode = 'show';

class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            customization: {}
        };
    }

    componentDidMount() {
        const ref = this.props.match.params.ref.split('-');
        const oid = ref[ref.length - 1];
        Axios.get(`${this.props.uri_back}/cv/${oid}/show`)
        .then((res) => {
            console.log(res.data);
            this.setState({ data: res.data, customization: res.data.resumeCustomization || {} });
        });
    }

    render() {
        const customization = this.state.customization;
        return (
            <DeveloperProfile
                mode={mode}
                data={this.state.data}
                options={{
                    // side: 'back',
                    apiKeys: {
                        giphy: process.env.REACT_APP_GIPHY
                    },
                    endpoints: {
                        devicons:
                            'https://firebasestorage.googleapis.com/v0/b/jechercheundev.appspot.com/o/technologies%2Ftechnologies_list.json?alt=media&token=459028ba-d9bc-4480-a3c4-88633afab7e2'
                    },
                    customization
                }}
            />
        );
    }
}

export default Profil;
