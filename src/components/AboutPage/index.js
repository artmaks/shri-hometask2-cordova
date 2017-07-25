import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const About = () => {
    return (
        <Page>
            <Navbar title="About" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is About page!</p>
                <p>You can go <f7-link back>back</f7-link>.</p>
                <p>This app created by ****** task</p>
                <p>(C) Artem Maksimov 2017</p>
            </ContentBlock>
        </Page>
    );
};