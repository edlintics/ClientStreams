import React from 'react';
import { connect } from 'react-redux';
import {createStream} from '../../actions'
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {
    
    
    // every time the form get submited, we create the streama action
    onSubmit = (formValues) => {
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <h3> Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}





export default connect(null, { createStream}) (StreamCreate)