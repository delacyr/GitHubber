import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  repoContainer: {
    flexDirection: 'column',
    flex: 4.0,
  },
  title: {
    fontSize: 16,
    color: colors.dark,

  },
  description: {
    fontSize: 12,
    color: colors.text,
  },
  icon: {
    marginRight: 10,
    flex: 1.0,
    width: 45,
    height: 45,
  },
  button: {
    padding: 10,
  },
});

export default styles;
