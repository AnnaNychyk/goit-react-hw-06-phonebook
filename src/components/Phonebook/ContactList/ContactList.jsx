import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';
import { useSelector } from 'react-redux';
import { gerFilteredContacts } from '../../../redux/contacts/contacts-selectors';

function ContactList({ list, onRemove }) {
  const contacts = useSelector(gerFilteredContacts);
  return (
    <ul>
      {contacts &&
        list.map(({ id, name, number }) => (
          <ContactListItem key={id} name={name} number={number} id={id} />
        ))}
    </ul>
  );
}

ContactList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object.isRequired),
  onRemove: PropTypes.func.isRequired,
};

export default ContactList;
