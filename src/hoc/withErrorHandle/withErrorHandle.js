import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal'

// This is a reusable error handler function.
// Check this file and BurgerBuilder.js to see how to use.
const withErrorHandle = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            axios.interceptors.response.use(res=>res, error => {
                this.setState({ error: error });
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandle