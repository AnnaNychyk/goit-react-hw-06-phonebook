import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-actions';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const repeatedName = contacts.find(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });

    const repeatedNumber = contacts.find(contact => {
      return contact.number.toLowerCase() === number.toLowerCase();
    });

    if (repeatedName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    if (repeatedNumber) {
      alert(`${number} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));

    reset();
  };

  // const handleOnSubmit = event => {
  //   event.preventDefault();
  //   const duplicationName = contacts.find(contact => {
  //     return contact.name.toLowerCase() === name.toLowerCase();
  //   });

  //   if (duplicationName) {
  //     alert(`${name} is already in contacts.`);
  //     return;
  //   }

  //   dispatch(add_contact({ name, number }));
  //   reset();
  // };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="" className={styles.label}>
        Name
        <input
          className={styles.input}
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="" className={styles.label}>
        Number
        <input
          className={styles.input}
          name="number"
          value={number}
          onChange={handleChange}
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
