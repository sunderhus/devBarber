import React from 'react';
import AccountIcon from '../../assets/account.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import { TabArea, TabItem, TabItemCenter } from './styles';

interface stateProps {
  index: number;
}
interface Props {
  state: stateProps;
  navigation: any;
}

const CustomTabBar = ({ state, navigation }: Props) => {

  const customNavigate = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const handleCheckTabActive = (tabIndex: number): boolean => {
    return state.index === tabIndex;
  };

  return (
    <TabArea>
      <TabItem onPress={() => customNavigate('Home')}>
        <HomeIcon
          style={{ opacity: handleCheckTabActive(0) ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>
      <TabItem onPress={() => customNavigate('Search')}>
        <SearchIcon
          style={{ opacity: handleCheckTabActive(1) ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>
      <TabItemCenter onPress={() => customNavigate('Appointments')}>
        <TodayIcon width="32" height="32" fill="#4eadbe" />
      </TabItemCenter>
      <TabItem onPress={() => customNavigate('Favorites')}>
        <FavoriteIcon
          style={{ opacity: handleCheckTabActive(3) ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>
      <TabItem onPress={() => customNavigate('Profile')}>

        <AccountIcon
          style={{ opacity: handleCheckTabActive(4) ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#FFF"
        />

      </TabItem>
    </TabArea>
  );
};
export default CustomTabBar;
