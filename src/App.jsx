import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [allDatas, setAllDatas] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [id, setId] = useState(undefined);
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        setAllDatas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isRefresh]);

  const editTodo = async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: name,
        username: username,
        email: email,
        phone: phone,
      });
      setIsRefresh(!isRefresh);
      clearForm();
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const createTodo = async () => {
    try {
      await axios.post(`https://jsonplaceholder.typicode.com/users`, {
        name: name,
        username: username,
        email: email,
        phone: phone,
      });
      setIsRefresh(!isRefresh);
      clearForm();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setUserName('');
    setEmail('');
    setPhone('');
    setId(undefined);
  };

  return (
    <>
      <div className='container'>
        <div className='Main-header'>
          <h3>Data-base-Management</h3>
        </div>
        <div className='form-Div'>
          <form className='col-lg-'>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="username">User Name</label>
                <input type="text" className="form-control" id="username" placeholder="User Name" value={username} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="phone">Phone</label>
              <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={id ? editTodo : createTodo}>Add Data</button>
            </div>
          </form>
          <hr />
        </div>
        <div className='data-div'>
          {allDatas.map((element) => (
            <div className="card text-center" key={element.id}>
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <hr />
                <p className=""><span className='span-text'>User Name : </span>{element.username}</p>
                <p className=""><span className='span-text'>Email : </span>{element.email}</p>
                <p className=""><span className='span-text'>Phone : </span>{element.phone}</p>
                <div className='btnDiv'>
                  <button className='btn btn-success btn-sm' onClick={() => { setId(element.id); setName(element.name); setUserName(element.username); setEmail(element.email); setPhone(element.phone) }}>Edit</button>
                  <button className='btn btn-danger btn-sm' style={{ marginLeft: 10 }} onClick={() => removeTodo(element.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
