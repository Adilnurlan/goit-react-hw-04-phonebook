import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const isExist = this.state.contacts.find(
      cont => cont.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  handleInputChange = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
    this.findContact();
    // console.log(this.findContact());
  };

  findContact = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.trim().toLowerCase());
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={s.div}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit} />

        <h2>Contacts</h2>
        <Filter
          filter={this.filter}
          filterInputChange={this.handleInputChange}
        />
        <ContactList
          contacts={this.findContact()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
