import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
    List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
    LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Toolbar, Accordion, AccordionItem, AccordionToggle,
    AccordionContent, Messages, Message, StatusBar, Tabs, Tab
} from 'framework7-react';

import {routes} from './routes';
import Glitch from './libs/Glitch';
import AppTabs from './components/AppTabs';
import BottomTabBar from './components/BottomTabBar';
import MainView from './components/MainView';
import * as glitchActions from './actions/glitch';


class App extends React.Component {
    componentDidMount() {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        const glitch = new Glitch(canvas, context);
        this.props.actions.glitchInit(glitch);
    }

    render() {
        return (
            <Framework7App themeType="ios" routes={routes}>
                <Statusbar></Statusbar>
                <MainView />
            </Framework7App>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        glitchInstance: state.glitch.glitchInstance
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(glitchActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);