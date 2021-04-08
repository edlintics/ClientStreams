import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux'
import {fetchStream}from '../../actions'

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        // Access DOM element to create the stream player as teh web load up FIRST
        // equal to get elemtById
        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id)
        this.buildPlayer();
        
    }

    // anytime the component is rendered, we try to build the player again
    componentDidUpdate() {
        this.buildPlayer();
    }

    //clean up component to avoid data keep fecthing to the player
    componentWillMount() {
        this.player.destroy()
    }

    buildPlayer() {

        // if there is alreay player exits or there is no data of the stream
        if(this.player || !this.props.stream) {
            return; // return nothing
        }

        //only set up the player when the data is fetched
        const { id } = this.props.match.params;
        this.player = flv.createPlayer( {
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load();


    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const {title, description} = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream}) (StreamShow);