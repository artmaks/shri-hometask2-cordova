import React, {PropTypes} from 'react';

import {
    Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
    List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
    LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Toolbar, Accordion, AccordionItem, AccordionToggle,
    AccordionContent, Messages, Message, StatusBar, Tabs, Tab
} from 'framework7-react';

class BottomTabBar extends React.Component {
    render() {
        return (
            <Toolbar tabbar>
                <Link iconF7="images" tabLink="#feed" />
                <Link iconF7="add_round" tabLink="#edit" />
            </Toolbar>
        );
    }
}

module.exports = BottomTabBar;