import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RootState} from '../store';
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPopover, IonTitle, IonToolbar} from '@ionic/react';
import './About.css';
import AboutPopover from '../components/AboutPopover';

type Props = ReturnType<typeof mapStateToProps>

type State = {
    showPopover: boolean,
    showPopoverEvent: null | MouseEvent
}

class About extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showPopover: false,
            showPopoverEvent: null
        };
    }

    presentPopover = (e: MouseEvent) => {
        this.setState(() => ({
            showPopover: true,
            showPopoverEvent: e
        }));
    };

    dismissPopover = () => {
        this.setState(() => ({
            'showPopover': false,
            'showPopoverEvent': null
        }));
    };

    render() {
        return (
            <>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>About</IonTitle>
                        <IonButtons slot="end">
                            <IonButton icon-only onClick={this.presentPopover}>
                                <IonIcon slot="icon-only" name="more"></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonPopover
                    isOpen={this.state.showPopover}
                    event={this.state.showPopoverEvent}
                    onDidDismiss={this.dismissPopover}
                >
                    <AboutPopover
                        dismissPopover={this.dismissPopover}
                    />
                </IonPopover>

                <IonContent>
                    <div className="about-header">
                        <img src="assets/img/fishlogo.png" alt="Steve's Fish Emporium"/>
                    </div>
                    <div className="ion-padding about-info">
                        <h4>Steve's Fish Emporium</h4>

                        <p>
                            We are specialists in Freshwater Tropical and Tropical Marine. We are also suppliers of pond products, aquariums and viviariums.
                            <br/> <br/>
                            We are one of the largest aquatic emporiums in London, and we pride our selves in 1 to 1 service and try to give the best possible advice to each customer
                            from beginner to experienced. We will always give a warm and friendly welcome to anyone who walks through the door!
                            <br/> <br/>
                            Please come to one of our branches to view our vast array of tropical and marine livestock.
                            We house a large selection of tropical and marine fish including a large selection of corals and invertebrates and freshwater fish.
                        </p>
                    </div>
                </IonContent>
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({});

export default connect(
    mapStateToProps
)(About);
