import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  empty: {
    fontSize: 14,
    alignItems: 'center',
  },
  loading: {
    alignItems: 'center',
    margin: 20,
  },
});

export default styles;
