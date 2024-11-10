import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../content/UserContext';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

const UserListScreen = () => {
  const navigation = useNavigation();

  //*Contexte abone olmak için useContext hooku kullanılır.UseContext içerisine contextin verilerini getirir.
  const {loading, error, users} = useContext(UserContext);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserDetails', {userId: item.id})
              }>
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
