import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

export interface TextoLocalizado {
  espanol: string;
  [key: string]: string;
}

export interface Moneda {
  nombre: TextoLocalizado;
  codigo: string;
  codigo_pais: string;
}

export interface Pais {
  id: number;
  nombre: TextoLocalizado;
  capital: TextoLocalizado;
  region: TextoLocalizado;
  lenguaje: TextoLocalizado;
  poblacion: string;
  bandera: string;
  monedas: Moneda[];
  descripcion: TextoLocalizado;
}

export interface Maravilla {
  id: string;
  nombre: string;
  pais: string;
  imagen: string;
  latitud: number;
  longitud: number;
  Consejos: string[];
}

export type PaisesStackParamList = {
  Paises: undefined;
  DetallePais: { country: Pais };
};

export type MaravillasStackParamList = {
  Maravillas: undefined;
  Consejos: { tips: Maravilla };
};

export interface ListaPaisesProps {
  navigation: StackNavigationProp<PaisesStackParamList, 'Paises'>;
}
export interface DetallePaisProps {
  route: RouteProp<PaisesStackParamList, 'DetallePais'>;
  navigation: StackNavigationProp<PaisesStackParamList, 'DetallePais'>;
}
export interface ListaMaravillasProps {
  navigation: StackNavigationProp<MaravillasStackParamList, 'Maravillas'>;
}
export interface DetalleMaravillasProps {
  route: RouteProp<MaravillasStackParamList, 'Consejos'>;
  navigation: StackNavigationProp<MaravillasStackParamList, 'Consejos'>;
}