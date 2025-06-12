import React, { useContext } from 'react';

import Header from '../../components/Header';
import { ConfigContext } from '../../contexts/ConfigContext';

import './styles.scss';

function ConfigurationPage() {
  const { timeAfter, timeBefore, setTimeBefore, setTimeAfter } = useContext(
    ConfigContext
  );

  return (
    <div className='container'>
      <Header />
      <div className='configContainer'>
        <div>
          <h2>Settings:</h2>
          <label htmlFor='before'>Time before sending message:</label>
          <div>
            <input
              id='before'
              type='number'
              value={timeBefore}
              onChange={(e) => setTimeBefore(e.target.value)}
            />
            <span>MS (milliseconds)</span>
          </div>
          <label htmlFor='after'>Time after sending message:</label>
          <div>
            <input
              id='after'
              type='number'
              value={timeAfter}
              onChange={(e) => setTimeAfter(e.target.value)}
            />
            <span>MS (milliseconds)</span>
          </div>

          <p>
            Configuring these time intervals is important to avoid the browser
            closing before the message is sent to the contact. If this happens,
            it will interrupt the message sending process and display a warning
            message in the browser.
            <p>
              Factors such as internet speed and your computer's processing power
              may influence the need for increased timing.
            </p>
            <strong>
              It is recommended to test with a small contact list to verify the
              functionality.
            </strong>
          </p>
          <img src='assets/leave.png' alt='Warning message' />
        </div>
      </div>
    </div>
  );
}

export default ConfigurationPage;