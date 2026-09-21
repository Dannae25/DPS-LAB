import { useEffect, useMemo, useState } from 'react';
import {
  Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,
  type ListRenderItem,
} from 'react-native';
import BuscadorPaises from './BuscadorPaises';
import type { ListaPaisesProps, Pais } from './types';

const windowWidth = Dimensions.get('window').width;

const ListaPaises = ({ navigation }: ListaPaisesProps) => {
  const [countries, setCountries] = useState<Pais[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => { fetchCountries(); }, []);

  const fetchCountries = async (): Promise<void> => {
    try {
      const response = await fetch('https://65f9be823909a9a65b1942ac.mockapi.io/paises');
      const data: Pais[] = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const countriesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return countries;
    return countries.filter((pais) => {
      const nombre = pais.nombre.espanol.toLowerCase();
      const codigo = pais.monedas[0]?.codigo_pais?.toLowerCase() ?? '';
      return nombre.includes(texto) || codigo.includes(texto);
    });
  }, [countries, busqueda]);

  const renderItem: ListRenderItem<Pais> = ({ item }) => (
    <TouchableOpacity
      style={styles.countryCard}
      onPress={() => navigation.navigate('DetallePais', { country: item })}
    >
      <View style={styles.countryInfo}>
        <Image
          source={{ uri: item.bandera }}
          style={styles.flagImage}
          onError={({ nativeEvent }) =>
            console.warn(`Error cargando bandera de ${item.nombre.espanol}:`, nativeEvent.error)
          }
        />
        <Text style={styles.countryName}>{item.nombre.espanol}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BuscadorPaises valor={busqueda} onCambiar={setBusqueda} />
      <FlatList
        data={countriesFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.countryList}
        numColumns={2}
        ListEmptyComponent={<Text style={styles.sinResultados}>No se encontraron países.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  countryList: { padding: 10 },
  countryCard: { width: windowWidth / 2 - 15, margin: 5, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', overflow: 'hidden' },
  countryInfo: { justifyContent: 'center', alignItems: 'stretch', padding: 10 },
  flagImage: { width: '100%', height: 90, resizeMode: 'contain', backgroundColor: '#f2f2f2' },
  countryName: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  sinResultados: { textAlign: 'center', marginTop: 30, color: '#888' },
});

export default ListaPaises;