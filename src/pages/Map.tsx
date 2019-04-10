import React from 'react';
import {connect} from 'react-redux';
import {actions, RootState, selectors} from '../store';
import Map from '../components/Map';
import {IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent} from '@ionic/react';
import {Location} from '../store/locations/types';
import {Plugins} from '@capacitor/core';

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;
const {Geolocation} = Plugins;

const MapPage: React.FC<Props> = (props) => {

    function getMyPosition() {
        if (Geolocation) {

            Geolocation.getCurrentPosition().then(coordinates => {

                props.addLocation({
                    id: 0,
                    name: 'Your current location',
                    lat: coordinates.coords.latitude,
                    lng: coordinates.coords.longitude
                })
            });
        }
    }

    if (!props.userLocationRetrieved) {
        getMyPosition();
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent class="map-page">
                <Map locations={props.locations} mapCenter={props.mapCenter}/>
            </IonContent>
        </>
    );
}

const mapDispatchToProps = {
    addLocation: (location: Location) => actions.locations.updateLocations(location)
};

const mapStateToProps = (state: RootState) => ({
    locations: selectors.locations.allLocations(state.locations),
    mapCenter: selectors.locations.mapCenter(state.locations),
    userLocationRetrieved: state.locations.userLocationRetrieved
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPage);
