import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  tab: {
    height: 30,
    backgroundColor: colors.filter,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  tabFilter: {
    color: colors.dark,
    opacity: 0.5,
  },
  active: {
    fontWeight: 'bold',
    opacity: 1.0,
  },
  loading: {
    alignItems: 'center',
    margin: 20,
  },
});

export default styles;
