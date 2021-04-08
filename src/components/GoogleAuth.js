import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from "../actions"


// Code block running order:
//1) get the current state of the of user (signIn: true: false) from the API, render teh button based on the state of the users
//2) 

//data for controling authntication https://developers.google.com/identity/sign-in/web/reference

class GoogleAuth extends React.Component {

    componentDidMount() {

        //load additional library
        window.gapi.load('client:auth2', () => {
            // pass in additional module when the library successfuly loaded up 
            window.gapi.client.init({ // initiate an async request, return a promise
                clientId: '715561962535-2a94ci2d48h7bl4093e28oi40sv85kqq.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => { // return promise

                // getting a refernce to auth object and saving a reference to the component class
                this.auth = window.gapi.auth2.getAuthInstance()
                // update the text, notice the component to rerender
                this.onAuthChange(this.auth.isSignedIn.get()) // passing the result from above as an parameter of AuthChange function
                // listen for the event change and execute the function within the parameter
                this.auth.isSignedIn.listen(this.onAuthChange) // wheneverthere is a change in the signedIn state, call the authChange function again
            }

            )
        }) ;
    }

    onAuthChange = isSignedIn => {
        // rerender component when there is a finish in rendered event
        if (isSignedIn){
            // create the action of sign in, passing to redux store
            this.props.signIn(this.auth.currentUser.get().getId());
            // passing the google id as a parameter to the action of SignIn
        } else {
            // create the action of sign out
            this.props.signOut()
        }
    }

    // signIn function from window
    onSignInClick = () => {
        this.auth.signIn();
    }

    // sign out function from window
    onSignOutClick = () => {
        this.auth.signOut();
    }


    renderAuthButton() {
        //pass in the state from REDUX STORE (not from component), and pass in the state to the componentxw
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn === true){
            return (
                <button onClick={this.onSignOutClick} className = "ui red google button">
                    <i className="google icon" />
                    Sign out
                </button>
            )
        } else {
            return ( 
                <button onClick={this.onSignInClick}className = "ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
 }

 // after passing the state to redux store, this is when you query the sate from redux store to component again 
 const mapStateToProps = (state) => {
     return {isSignedIn: state.auth.isSignedIn}
 }

 export default connect( mapStateToProps, {signIn, signOut}) (GoogleAuth)