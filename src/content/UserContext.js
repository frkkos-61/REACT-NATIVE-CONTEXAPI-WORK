/**
 * Context API:
 * Uygulama birden çok bileşenin ihtiyacı olan verileri bileşenlerden bağımsız bir şekilde konumlama merkezlerde yönetmeye yarar.
 
 * Context yapısı içinde verilerin statik ve verileri değiştirmeye yarayan fonksiyonları tutabiliriz. 
 
 * Context tuttuğumuz statelerin bileşenlere doğrudan aktarım yapabilen state yönetim aracıdır.
 
 */

import axios from 'axios';

//* İlk adım
import {createContext, useEffect, useState} from 'react';

//*ikinci adım
export const UserContext = createContext();

//*Dördüncü adım
export const UserProvider = ({children}) => {

  //*Beşinci Adım
  const [users, setUsers] = useState([]); //* [] sayfaya ilk girdiğimizde kullanıcı ne görmesini istiyoruz işte tam olarak bunu state içerisinde kullanmamız gereikiyor.

  const [error, setError] = useState(null); //*Başlangıçta null verelim ki sürekli hata fırlatmasın

  const [loading, setLoading] = useState(true); //*Başlangıçta true verelim, sayfa ilk açıldığında yükleme aşamasında görürüz, sonra axios isteği tamamlanınca kendisini false çeksin.

  
  useEffect(() => {
    axios
      //* API'ye istek at
      .get('https://jsonplaceholder.typicode.com/users')
      //*Cevap başarılı gelirse setUser'e veriyi aktar

      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })

      //*hata alırsak hatayı error statene aktar
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


  //*Üçüncü adım sağlayıcı fonk mutlaka provideri return etmelidir ve App'i sarmalamalıdır.Value olarak eklenen değerler projedeki bileşenler tarafından erişilebilir olur.
  return (
    <UserContext.Provider value={{users, error, loading}}>
      {children}
    </UserContext.Provider>
  );
};
