//*Birinci Adım
import axios from 'axios';
//*Altıncı Adım
import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

//*İkinci Adım
export const TaskContext = createContext();

//*Dördüncü Adım
export const TaskProvider = ({children}) => {
  //*Beşinci Adım
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  //*Yedinci Adım
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  //*Şimdi burada bir fonk yazacağız, bu da Remove yazan butona; bu fonksiyonu atayacağız.Gönderilen id'li task'ı sileceğiz.

  //*tasks statini güncelle
  const removeTask = id => {
    const filtred = tasks.filter(task => task.id !== id);
    setTasks(filtred);
    Alert.alert('Task Silindi');
  };

  const addTask = title => {
    const newTask = {
      userId: 1,
      id: tasks.length + 1,
      title,
    };
    setTasks([...tasks, newTask]);
    Alert.alert('Yeni Task Eklendi');
    setNewTaskTitle(" ");
  };

  //*Üçüncü Adım
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        removeTask,
        newTaskTitle,
        setNewTaskTitle,
        addTask,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
