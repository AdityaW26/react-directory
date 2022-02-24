import React, {useState, useEffect } from 'react';
import './App.css';
import ContactCard from './ContactCard';

function App() {

const [contacts, setContacts] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('');

useEffect(() => {
  console.log("Effect ran");
  getContacts();
}, []);

const getContacts = async() => {

  const response = await fetch(`https://localhost:3002/phonedirectorymernstack.herokuapp.com/api/contacts/${query}`,
    {
      method: 'GET', 
      headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
      })
    }
  );

  if (!response.ok){
    const message = `An error occurred - ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  console.log(data.error);
  console.log(data.message);
  console.log(data);
  setContacts(data);
  
}

const updateSearch = e => {
  setSearch(e.target.value);
}

const getSearch = e => {
  // to only search when user clicks on search button, else it will search for every character typed
  e.preventDefault(); // stop page refresh
  setQuery(search);
  setSearch('');
}

  return (
    <div className="App">
      <form className='search-form' onSubmit={getSearch}>
        <input className='search-bar' type="text" defaultValue='Enter name' value={search} onChange={updateSearch}/>
        <button className='search-button' type='submit'>Search</button>
        <button className='search-button' type='submit'>Add</button>
      </form>
        <div className='contacts'>
        {contacts.map(c => (
          <ContactCard 
          key={c.phone}  // just to resolve error : every element in array should have a unique key
          fname={c.firstName} 
          lname={c.lastName} 
          phone = {c.phone}
          email = {c.email}
          image={c.pictureUrl}
          />
        ))}
      </div>
      <div>
      <ContactCard 
      // sample test case
          key='1'  // just to resolve error : every element in array should have a unique key
          fname='Aditya'
          lname='Wanjale'
          phone = '9*******9'
          email = 'aditya@gmail.com'
          image='https://i.guim.co.uk/img/media/a7fe7170defa865d2b96b829f05c5d8fa82d8edf/0_20_2201_1321/master/2201.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=72bbae118ff1631bcc0d1f837159a727'
          />
      </div>

    </div>
  );
}

export default App;
