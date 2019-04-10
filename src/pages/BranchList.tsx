import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {RootState} from '../store';
import {History} from 'history';
import {
    IonIcon, IonMenuButton, IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonList,
    IonGrid, IonCol, IonRow, IonButton, IonHeader, IonContent, IonToolbar, IonButtons, IonTitle
} from '@ionic/react';
import {Branch} from '../store/branches/types';
import {Fish} from '../store/fishes/types';


interface ItemProps {
    branch: Branch;
    branchFishes: Fish[];
    history: History;
}

const BranchItem = ({branch, branchFishes, history}: ItemProps) => {
    function openBranchShare(branch: Branch) {
    }

    function openContact(branch: Branch) {
    }

    function goToLink(e: MouseEvent) {
        if (!e.currentTarget) {
            return;
        }
        e.preventDefault();
        history.push((e.currentTarget as HTMLAnchorElement).href);
    }

    return (
        <IonCard class="branch-card">
            <IonCardHeader>
                <IonItem
                    button
                    detail={false}
                    href={`/branches/branch/${branch.id}`}
                    onClick={goToLink}
                >
                    <IonAvatar slot="start">
                        <img src={process.env.PUBLIC_URL + branch.profilePic} alt="Branch profile pic"/>
                    </IonAvatar>
                    <strong>{branch.name}</strong>
                </IonItem>
            </IonCardHeader>

            <IonCardContent class="outer-content">

                <IonItem button href={`/branches/branch/${branch.id}`} onClick={goToLink}>
                    <h2>About {branch.name}</h2>
                </IonItem>
                <br/>

                <h2>This branch stocks:</h2>

                <IonList>
                    {branchFishes.map(fish => (
                        <IonItem
                            href={`/branches/fishes/${fish.id}`}
                            key={fish.name}
                            onClick={goToLink}
                        >
                            <h3>{fish.name}</h3>
                        </IonItem>
                    ))}
                </IonList>
            </IonCardContent>

            <IonRow no-padding justify-content-center>
                <IonCol text-left size="4">
                    <IonButton fill="clear" size="small" color="primary"
                               onClick={() => window.open(`https://www.twitter.com/${branch.twitter}`, '_blank')}>
                        <IonIcon slot="start" name="logo-twitter"></IonIcon>
                        Tweet
                    </IonButton>
                </IonCol>
                <IonCol text-left size="4">
                    <IonButton fill="clear" size="small" color="primary" onClick={() => openBranchShare(branch)}>
                        <IonIcon slot="start" name='share-alt'></IonIcon>
                        Share
                    </IonButton>
                </IonCol>
                <IonCol text-left size="4">
                    <IonButton fill="clear" size="small" color="primary" onClick={() => openContact(branch)}>
                        <IonIcon slot="start" name='chatboxes'></IonIcon>
                        Contact
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonCard>
    );
};

type ListProps = RouteComponentProps & ReturnType<typeof mapStateToProps>;

const BranchList = ({branches, fishes, history}: ListProps) => (
    <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Branches</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent class="outer-content branch-list">
            <IonList>
                <IonGrid fixed>
                    <IonRow align-items-stretch>
                        {branches.map((branch) =>
                            <IonCol size="12" size-md="6" key={branch.id}>
                                <BranchItem
                                    branch={branch}
                                    history={history}
                                    branchFishes={fishes.filter(fish => fish.branchIds.indexOf(branch.id) !== -1)}
                                />
                            </IonCol>
                        )}
                    </IonRow>
                </IonGrid>
            </IonList>
        </IonContent>
    </>
);

const mapStateToProps = (state: RootState) => ({
    branches: state.branches.branches,
    fishes: state.fishes.fishes
});

export default connect(
    mapStateToProps
)(BranchList);
