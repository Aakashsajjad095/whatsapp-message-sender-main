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
          <button onClick={selectFile} type='button' className='secondary'>
            {!isListLoaded ? '📄 Select file from computer' : '📄 Select a new file'}
          </button>
          <div className="file-requirements">
  <h3>📋 File Requirements</h3>
  {/* <ul> */}
    <li>
      The file must include two columns with headers: <strong>CompanyName</strong> and <strong>ContactNumber</strong>,
      headers must be in the first row of the file,
      and phone numbers must include the area code.
    </li>
  {/* </ul> */}
</div>
          <span className="spanContacts">{listJSON.length} contacts found</span>

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
     
      </div>
      <FooterButton />
    </div>
  );
}

export default Home;