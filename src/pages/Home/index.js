import React, { useContext } from 'react';
import FooterButton from '../../components/FooterButton';
import Header from '../../components/Header';
import { AppContext } from '../../contexts/AppContext';

import './styles.scss';

function Home() {
  const { isListLoaded, listJSON, selectFile } = useContext(AppContext);

  return (
    <div className='container'>
      <Header />
      <div className='contactsContainer'>
        <div>
          <h2>Upload .xlsx or .xls file</h2>
          <button onClick={selectFile} type='button'>
            {!isListLoaded ? 'Select file from computer' : 'Select a new file'}
          </button>
          <p>
            WARNING! The file must contain the columns <strong>name</strong> and{' '}
            <strong>phone</strong> as headers (first cell of the column). 
            Every phone number must include the area code.
          </p>
          <span className="spanContacts">{listJSON.length} contacts found</span>
        </div>
        <div>
          <h2>Contact List:</h2>
          <ul>
            {listJSON.length > 0 ?
              listJSON.map((contact, index) => {
                return (
                  <li key={index}>
                    <strong>{contact.CompanyName}</strong>{' '}
                    <span>{contact.ContactNumber}</span>
                  </li>
                );
              }) : <p style={{color: 'var(--gray-100)'}}>No contacts. Select a contact list file to get started.</p>}
          </ul>
        </div>
      </div>
      <FooterButton />
    </div>
  );
}

export default Home;