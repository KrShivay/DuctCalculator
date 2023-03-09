import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DuctChecker from '../../app/DuctChecker';
import DuctSizes from '../../app/DuctSizes';
import Explore from '../../app/Explore';
import {firstColor, secondColor} from '../../styles/constants';

const DuctSizesRoute = () => (
  <SafeArea>
    <DuctSizes />
  </SafeArea>
);

const DuctCheckerRoute = () => (
  <SafeArea>
    <DuctChecker />
  </SafeArea>
);

const SettingsRoute = () => (
  <SafeArea>
    <Explore />
  </SafeArea>
);

const flexView = {flex: 1};

const SafeArea = ({children}: {children: JSX.Element}) => {
  return <SafeAreaView style={flexView}>{children}</SafeAreaView>;
};

const Dashbaord = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'duxt_sizer',
      title: 'Duct Sizes',
      focusedIcon: 'home-circle',
    },
    {key: 'duct_checker', title: 'Ductulator', focusedIcon: 'sigma'},
    {key: 'settings', title: 'Information', focusedIcon: 'cogs'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    duxt_sizer: DuctSizesRoute,
    duct_checker: DuctCheckerRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      compact
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={firstColor}
      inactiveColor={secondColor}
    />
  );
};

export default Dashbaord;
