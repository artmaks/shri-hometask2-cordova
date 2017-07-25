import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
    List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
    LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Toolbar, Accordion, AccordionItem, AccordionToggle,
    AccordionContent, Messages, Message, StatusBar, Tabs, Tab, Icon
} from 'framework7-react';


import AppTabs from '../AppTabs';
import BottomTabBar from '../BottomTabBar';

class MainView extends React.Component {
    render() {
        return (
            <Views>
                <View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
                    {/* Navbar */}
                    {this.context.framework7AppContext.theme.ios ? (
                        <Navbar>
                            <NavCenter sliding>Glitch It</NavCenter>
                            <NavRight>
                                <Link iconF7="info" href="/about/"/>
                            </NavRight>
                        </Navbar>
                    ) : null}
                    <BottomTabBar/>
                    {/* Pages */}
                    <Pages>
                        <Page>
                            <AppTabs/>
                        </Page>
                    </Pages>
                </View>
            </Views>
        );
    }
}
MainView.contextTypes = {
    framework7AppContext: PropTypes.object
};

module.exports = MainView;