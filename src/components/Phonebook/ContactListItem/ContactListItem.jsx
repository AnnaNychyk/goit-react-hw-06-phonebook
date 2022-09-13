import styles from './ContactListItem.module.css';
import { useDispatch } from 'react-redux';
import { removeContact } from 'redux/contacts/contacts-actions';

function ContactListItem({ id, name, number }) {
  const dispatch = useDispatch();

  const deleteContact = () => {
    dispatch(removeContact(id));
  };

  return (
    <li key={id}>
      <span className={styles.name}>{name}</span>:{' '}
      <span className={styles.number}>{number}</span>
      <button className={styles.btn} type="button" onClick={deleteContact}>
        Delete
      </button>
    </li>
  );
}

export default ContactListItem;
