import React from 'react';
import { Fish, FishGroup } from '../store/fishes/types';
import FishListItem from './FishListItem';
import { IonList, IonListHeader, IonItemGroup, IonItemDivider, IonLabel } from '@ionic/react';

interface Props {
  fishes: Fish[]
  hidden: boolean;
  listType: "all" | "favorites"
}

const FishList: React.FunctionComponent<Props> = ({fishes, hidden, listType }) => {
  if (fishes.length === 0) {
    return (
      <IonList style={hidden ? {display: 'none'} : {}}>
        <IonListHeader>
          No Fishes Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <IonList style={hidden ? {display: 'none'} : {}}>
          { fishes.map((fish: Fish, fishIndex: number) => (
            <FishListItem
              key={`${fishIndex}`}
              fish={fish}
              listType={listType}
            />
          ))}
    </IonList>
  );
};

export default FishList;
