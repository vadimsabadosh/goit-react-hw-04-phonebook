import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('phonebook') !== null) {
      setContacts(JSON.parse(localStorage.getItem('phonebook')));
    }
  }, []);

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('phonebook', JSON.stringify(contacts));
    }
  }, [contacts]);

  function onFilterInput(e) {
    setFilter(e.target.value);
  }

  function onDelete(id) {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  }

  function onAddContact(name, number) {
    const isExists = contacts.find(item => item.name.includes(name));
    if (!isExists) {
      const newContact = {
        name,
        id: uuidv4(),
        number,
      };
      setContacts(prevState => [...prevState, newContact]);
    } else {
      alert(`${name} is already in contacts`);
    }
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilterInput} />
      <ContactList contacts={contacts} filter={filter} deleteItem={onDelete} />
    </div>
  );
}
