import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
    List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
    LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Toolbar, Accordion, AccordionItem, AccordionToggle,
    AccordionContent, Messages, Message, StatusBar
} from 'framework7-react';

class FeedPage extends React.Component {

    render() {
        return (
            <GridRow className="emptyState">
                <GridCol width="100" className="center">
                    <i className="f7-icons">home</i>
                </GridCol>
                <GridCol width="100" className="center">You have no any photos...</GridCol>
                <GridCol width="100" className="center">Sorry we don't support feed news in this time...</GridCol>
                <GridCol width="25" className="center"/>
                <GridCol width="50" className="center">
                    <Button tabLink="#edit" color="blue">Create new photo</Button>
                </GridCol>
                <GridCol width="25" className="center"/>
            </GridRow>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        glitchInstance: state.glitch.glitchInstance,
    };
}
export default connect(mapStateToProps)(FeedPage);