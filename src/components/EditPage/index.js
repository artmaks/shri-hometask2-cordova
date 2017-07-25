import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
    List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
    LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Toolbar, Accordion, AccordionItem, AccordionToggle,
    AccordionContent, Messages, Message
} from 'framework7-react';

class EditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            isGlitching: false,
            glitchiness: 5,
            brightness: 5
        }
    }

    glitch() {
        this.setState({isGlitching: true});
        this.props.glitchInstance.glitchImage(this.state.glitchiness, this.state.brightness, this.onGlitchComplete.bind(this));
    }

    onGlitchComplete() {
        this.setState({isGlitching: false});
    }

    getPhoto(type) {
        console.log(this.props);
        if(!navigator.camera)
            return this.props.glitchInstance.loadImage("img/911.jpg");

        navigator.camera.getPicture(
            function onSuccess(imageUri) {
                var image = document.querySelector('img#image');
                this.props.glitchInstance.loadImage(imageUri);
            }.bind(this),
            function onError(error) {
                console.error("Unable picture: " + error);
            },
            {
                sourceType: type === 'album' ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                targetWidth: 1024,
                targetHeight: 768,
                correctOrientation: true
            }
        );
    }

    share() {
        const base64Data = this.props.glitchInstance.saveImage();
        window.plugins.socialsharing.share(null, null, base64Data, null,
            () => {
                alert("Congratulations! Image was successfully sent");
            },
            (e) => {
                alert("error: " + e)
            });
    }

    save() {
        try {
            const base64Data = this.props.glitchInstance.saveImage();
            cordova.base64ToGallery(
                base64Data,
                {
                    prefix: 'img_',
                    mediaScanner: true
                },
                function(path, two) {
                    alert(path);
                    console.log(path);
                    console.log(two);
                },

                function(err) {
                    alert(err);
                }
            );
        } catch (err) {
            alert("It's possible only on the real app! Use the share button instead this");
        }
    }

    changeGlitchiness(event) {
        this.setState({
            glitchiness: event.target.value
        });
    }

    changeBrightness(e) {
        this.setState({
            brightness: event.target.value
        });
    }


    render() {
        const canvasStyle = {
            padding: 0,
            paddingBottom: "40px",
            position: "relative"

        };

        return (
            <GridRow>
                <GridCol style={canvasStyle}>
                    <canvas id="canvas"/>
                    {this.state.isGlitching &&
                        <div id="loading"></div>
                    }
                    <GridRow className="control-btns">
                        <GridCol width="50">
                            <Button big href="#" onClick={this.getPhoto.bind(this, 'camera')}>From camera</Button>
                        </GridCol>
                        <GridCol width="50">
                            <Button big href="#" onClick={this.getPhoto.bind(this, 'album')}>From gallery</Button>
                        </GridCol>
                        <GridCol width="100">
                            <Button big href="#" onClick={this.glitch.bind(this)}>Glitch it!</Button>
                        </GridCol>
                        <GridCol width="100">
                            <FormLabel>Level of glitchiness</FormLabel>
                            <FormInput type="range" min="0" max="10" step="1" value={this.state.glitchiness} onChange={this.changeGlitchiness.bind(this)}/>
                            <FormLabel>Level of brightness</FormLabel>
                            <FormInput type="range" min="0" max="10" step="1" value={this.state.brightness} onChange={this.changeBrightness}/>
                        </GridCol>
                        <GridCol width="100">
                            <Button big href="#" onClick={this.save.bind(this)}>Save it!</Button>
                        </GridCol>
                        <GridCol width="100">
                            <Button big href="#" onClick={this.share.bind(this)}>Share it!</Button>
                        </GridCol>
                    </GridRow>
                </GridCol>
            </GridRow>
        );
    }
}

EditPage.contextTypes = {
    framework7AppContext: PropTypes.object
};

function mapStateToProps(state, props) {
    return {
        glitchInstance: state.glitch.glitchInstance,
    };
}
export default connect(mapStateToProps)(EditPage);