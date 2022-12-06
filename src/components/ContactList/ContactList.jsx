import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={s.contact} key={id}>
            <p className={s.contactInfo}>
              {name}: {number}
            </p>
            <button type="button" onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.protoTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
