import React, {PropTypes} from 'react';

import {
    Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
    List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
    LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Toolbar, Accordion, AccordionItem, AccordionToggle,
    AccordionContent, Messages, Message, StatusBar, Tabs, Tab
} from 'framework7-react';

import EditPage from '../EditPage';
import FeedPage from '../FeedPage';

class AppTabs extends React.Component {
    render() {
        return (
            <Tabs animated>
                <Tab id="feed" active>
                    <FeedPage/>
                </Tab>
                <Tab id="edit">
                    <EditPage/>
                </Tab>
            </Tabs>
        );
    }
}

module.exports = AppTabs;