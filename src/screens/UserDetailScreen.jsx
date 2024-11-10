import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../content/UserContext';

const UserDetailScreen = () => {
  const navigaiton = useNavigation();

  //*Diğer bir yöntem yukarıdan import etik sbitte tut,UserListScreen den gelen id'yi useRoute üzerinden aldık.
  const route = useRoute();

  //*userId'yi obje dağıtma yöntemiyle al, route'un içerisinde userId'yi bul
  const {userId} = route.params;

  //*Abone ol
  const {users} = useContext(UserContext);

  //*userId ListScreende depoladıki user dizisi içerisinde UserDetailScreen ekranına gönderdiğimiz id ile birleşen veriyi getirdik.
  const user = users.find(user => user.id === userId);
  //console.log(user);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Text style={styles.info}>{user.phone}</Text>
        <Button
          title="View Task"
          onPress={() => navigaiton.navigate('Task', {userId})}
        />
      </View>
    </View>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#EEEDEB',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});
