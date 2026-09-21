import { StyleSheet, TextInput, View } from 'react-native';

interface BuscadorPaisesProps {
  valor: string;
  onCambiar: (texto: string) => void;
}

const BuscadorPaises = ({ valor, onCambiar }: BuscadorPaisesProps) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Buscar por nombre o código de país..."
      value={valor}
      onChangeText={onCambiar}
      autoCorrect={false}
      autoCapitalize="none"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, backgroundColor: '#f7f7f7',
  },
});

export default BuscadorPaises;