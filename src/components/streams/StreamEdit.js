import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {fetchStream, editStream} from '../../actions'
import StreamForm from './StreamForm'


// match.params.id is the data passed from redux router that query out the parameter inside the URL of any web
class StreamEdit extends React.Component {
    componentDidMount() {
        //calling the action of fetch stream to call for the data from server
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        // onsubmit of the form, call the editStream action with parsed id
        this.props.editStream(this.props.match.params.id, formValues)
    }
    render() {
        if (!this.props.stream) {
          return <div>Loading...</div>;
        }
        // initialValues props is a helper function from reduxForm to autofill the field with passing value from parents element
        // in the sate of stream contain properties of title and description so we can parsed in intial value
        /*Explaination of _.pick from lodash:
            1)pick out th property from the fetced object, in this case is title and description
            2)create a new object and append the new property that is assocaied with it 
        */
        return (
            <div>
                <h3> Edit a stream</h3>
                <StreamForm
                initialValues={_.pick(this.props.stream,'title', 'description')} 
                onSubmit={this.onSubmit} 
                />
            </div>
        )
      }

}

const mapStateToProps = (state, ownProps) => {
    // ownProps give you access to teh variables inside Stream EDit component
    return { stream: state.streams[ownProps.match.params.id] };
};
  
export default connect(
    mapStateToProps,
    { fetchStream, editStream}
)(StreamEdit);