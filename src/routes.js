import { StackNavigator } from 'react-navigation';

// import { colors } from 'styles';

// Importar minhas páginas
import Repositories from 'pages/repositories';
import Issues from 'pages/issues';

const Routes = StackNavigator({
  Repositories: { screen: Repositories },
  Issues: { screen: Issues },
}, {
  initialRouteName: 'Repositories',
});

export default Routes;
