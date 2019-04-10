import React from 'react';
import { connect } from 'react-redux';
import { RootState, actions } from '../store';
import { withRouter, RouteComponentProps } from 'react-router';
import {IonLabel, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonAlert, IonAvatar} from '@ionic/react';
import { Fish } from '../store/fishes/types';
import { AlertButton } from '@ionic/react';

type Props = RouteComponentProps<{}> & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {
  fish: Fish;
  listType: "all" | "favorites";
}

type State = {
  showAlert: boolean;
  alertHeader?: string;
  alertMessage?: string;
  alertButtons: (AlertButton | string)[];
}

class FishListItem extends React.Component<Props, State> {
  ionItemSlidingRef: React.RefObject<any>;
  defaultState: State = {
    showAlert: false,
    alertHeader: '',
    alertMessage: undefined,
    alertButtons: []
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.defaultState
    };
    this.ionItemSlidingRef = React.createRef();
  }

  dismissAlert = () => {
    this.setState(() => ({
      ...this.defaultState
    }));
    if (this.ionItemSlidingRef.current) this.ionItemSlidingRef.current.close();
  }

  addFavoriteFish = () => {
    if (this.props.favoriteFishes.indexOf(this.props.fish.id) !== - 1) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavoriteFish('Favorite already added')();
    } else {
      // remember this fish as a user favorite
      this.props.addFavorite(this.props.fish.id);

      // create an alert instance
      this.setState({
        showAlert: true,
        alertHeader: 'Favorite Added',
        alertButtons: [
          {
            text: 'OK',
            handler: this.dismissAlert
          }
        ]
      });
    }
  }

  removeFavoriteFish = (title: string) => () => {
    this.setState({
      showAlert: true,
      alertHeader: title,
      alertMessage: 'Would you like to remove this fish from your favorites?',
      alertButtons: [
        {
          text: 'Cancel',
          handler: this.dismissAlert
        },
        {
          text: 'Remove',
          handler: () => {
            this.props.removeFavorite(this.props.fish.id);
            this.dismissAlert();
          }
        }
      ]
    });
  }

  navigateToFish = (fishId: number) => () => {
    this.props.history.push(`/fishes/fishes/${fishId}`);
  }

  render() {
    return (
      <IonItemSliding ref={this.ionItemSlidingRef} class={'track-' + this.props.fish.tags[0].toLowerCase()}>
        <IonAlert
          isOpen={this.state.showAlert}
          header={this.state.alertHeader}
          buttons={this.state.alertButtons}
          onDidDismiss={this.dismissAlert}
        ></IonAlert>
        <IonItem button onClick={this.navigateToFish(this.props.fish.id)}>
          <IonAvatar slot="start">
            <img src={process.env.PUBLIC_URL + this.props.fish.pic} alt={this.props.fish.name}/>
          </IonAvatar>
          <IonLabel>
            <h3>{this.props.fish.name}</h3>
          </IonLabel>
        </IonItem>
        <IonItemOptions>
          { this.props.listType === "favorites" ?
            <IonItemOption color="danger" onClick={this.removeFavoriteFish('Remove Favorite')}>
              Remove
            </IonItemOption>
            :
            <IonItemOption color="favorite" onClick={this.addFavoriteFish}>
              Favorite
            </IonItemOption>
          }
        </IonItemOptions>
      </IonItemSliding>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  favoriteFishes: state.fishes.favoriteFishes
});

const mapDispatchToProps = {
  addFavorite: (fishId: number) => actions.fishes.addFavorite(fishId),
  removeFavorite: (fishId: number) => actions.fishes.removeFavorite(fishId),
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FishListItem));
