import React from 'react';
import PropTypes from 'prop-types';
export default function ContactList({ filter, contacts, deleteItem }) {
  return (
    <ul>
      {contacts
        .filter(item => item.name.toLowerCase().includes(filter))
        ?.map(item => (
          <li key={item.id}>
            {item.name}: {item.number}{' '}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
    </ul>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
