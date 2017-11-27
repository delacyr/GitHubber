import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  superContainer: {
    backgroundColor: colors.background,
  },
  container: {
    height: 54 + metrics.statusBarHeight,
    paddingTop: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  input: {
    flex: 3,
    backgroundColor: colors.background,
    fontSize: 12,
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default styles;
