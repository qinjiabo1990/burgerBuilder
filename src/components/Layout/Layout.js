import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    //this is the safe way to change previous state
    sideDrawerToggleHandler = () => {
        this.setState((preState) => { return {showSideDrawer: !preState.showSideDrawer} })
    }

    render() {
        return (
            <Aux>
                <Toolbar DrawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer} />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;