import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../store';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import './FishDetail.css';

type Props = RouteComponentProps<{ id: string, tab: string }> & ReturnType<typeof mapStateToProps> & {
  goBack: () => void
};

const FishDetail: React.FC<Props> = ({ fishes, branches, match, goBack }) => {
  const fish = fishes.find(f => f.id === parseInt(match.params.id, 10));
  if (fish == null) {
    return null;
  }
  const fishBranches = branches.filter(b => fish.branchIds.indexOf(b.id) !== -1);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton goBack={goBack} defaultHref={`/${match.params.tab}`} />
          </IonButtons>
          <IonTitle>{fish.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent padding class="fish-detail">
        <div className="ion-text-center">
             <img src={fish.pic} alt={fish.pic}/>
        </div>
        <div>
          <p>{fish.description}</p>

          <p className='branches-list-title'>Found at these branches:</p>

          {fishBranches.map(branch => (
            <h4 key={branch.name}>
              {branch.name}
            </h4>
          ))}

        </div>
      </IonContent>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  fishes: state.fishes.fishes,
  branches: state.branches.branches
});

export default connect(
  mapStateToProps
)(FishDetail)
