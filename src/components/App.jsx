import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  const formSubmit = contact => {
    const isExist = contacts.find(
      cont =>
        cont.name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    if (isExist) {
      return alert(`${contact.name} is already in contacts`);
    } else if ((contact.name.trim() === '', contact.number.trim() === '')) {
      return alert('Заполните все поля');
    }
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const handleInputChange = ({ currentTarget: { value } }) => {
    setFilter(value);
    // this.setState({
    //   filter: evt.currentTarget.value,
    // });
    findContact();
  };

  const findContact = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.trim().toLowerCase());
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(
    prevContacts => {
      if (contacts !== prevContacts) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    },
    [contacts]
  );

  return (
    <div className={s.div}>
      <h1>Phonebook</h1>
      <ContactForm addContact={formSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} filterInputChange={handleInputChange} />
      <ContactList contacts={findContact()} deleteContact={deleteContact} />
    </div>
  );
};
