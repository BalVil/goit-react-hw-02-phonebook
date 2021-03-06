import { Component } from 'react';
import { nanoid } from 'nanoid';
import 'modern-normalize';
import css from './App.module.css';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;
    if (
      contacts.findIndex(
        item => item.name.toLowerCase() === name.toLowerCase()
      ) !== -1
    ) {
      alert(`${name} is already in contacts `);
      return;
    }

    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getFilteredContact();

    return (
      <div className={css.container}>
        <section className={css.section}>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </section>
        <section className={css.section}>
          <h2 className={css.title}>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </section>
      </div>
    );
  }
}
