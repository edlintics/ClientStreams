import React from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom'

class StreamList extends React.Component {
    componentDidMount() {
         this.props.fetchStreams()
        
    }

    // helper function to make buttons appear if the current user id equal to teh user id stored in teh stream
    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
            <div className="right floated content">
                <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                    Edit
                </Link>
                <Link to={`/streams/delete/${stream.id}`}className="ui button negative">
                    Delete
                </Link> 
            </div>)
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`}>
                        {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    //only render if the user sign in
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // initially we convert the array to object in action in order to store data easily on redux
    // however, to make the mapping more easy in compoenents level, it is better to use array as a storage of data
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
    
}

export default connect(
    mapStateToProps,
     {fetchStreams})
(StreamList)