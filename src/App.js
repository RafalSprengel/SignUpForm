import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [agree, setAgree] = useState(false);
  const [trySend, setTrySend] = useState(false);
  const [sent, setSent] = useState(false);

  const [errorName, setErrorName] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPass, setErrorPass] = useState(true);
  const [errorAgree, setErrorAgree] = useState(true);

  const messages = {
    name: 'min 6 chars required and no space between',
    email: 'must contain @ char',
    pass: 'must have at least 6 chars',
    agree: 'You have to agree to term and condition'
  }

  const handleChangeInputs = (e) => {
    const FieldId = e.target.id;
    e.persist();
    switch (FieldId) {

      case 'name':
        setName(e.target.value);
        if (e.target.value.length > 5 && e.target.value.indexOf(' ') === -1)
          setErrorName(false)
        else
          setErrorName(true)
        break;

      case 'email':
        setEmail(e.target.value);
        (e.target.value.indexOf('@') > -1) ? setErrorEmail(false) : setErrorEmail(true);
        break;

      case 'pass':
        setPass(e.target.value);
        (e.target.value.length < 6) ? setErrorPass(true) : setErrorPass(false);
        break;

      case 'agree':
        setAgree(e.target.checked);
        (e.target.checked === false) ? setErrorAgree(true) : setErrorAgree(false);
        break;

      default:
        console.log('code error');
    }
  }

  const handleSendForm = (e) => {
    e.preventDefault();
    if (errorName === false && errorEmail === false && errorPass === false && errorAgree === false) {
      setSent(true);
      setName('');
      setEmail('');
      setPass('');
      setAgree(false);
      setTrySend(false);
      setErrorName(true);
      setErrorEmail(true);
      setErrorPass(true);
      setErrorAgree(true);
      setTimeout(() => {
        setSent(false)
      }, 2000)
    }
    else {
      alert('Please fill all fields correctly!');
      setTrySend(true);
    }
  }
  return (
    <>

      <div id='inner'>
        <div id='title'>Sign Up</div>
        <form id='personForm'
          onSubmit={handleSendForm}
          className={(sent) ? 'hidden' : ''}
        >
          <table >
            <tbody>
              <tr>
                <td className='left'>
                  <label htmlFor='name'>Your first Name: </label>
                </td>
                <td>
                  <input
                    id='name'
                    placeholder='tape your name'
                    className={((trySend && errorName) ? 'input-error' : '') + ((!errorName) ? ' input-ok' : '')}
                    onChange={event => handleChangeInputs(event)}
                    value={name}
                  >
                  </input>
                  <br></br>
                </td>
                <td>
                  <span className='message'>{(errorName) ? messages.name : <span className='mark-ok'>&#10003;</span>}
                  </span>
                </td>
              </tr>
              <tr>
                <td className='left'>
                  <label htmlFor='email'>Your email: </label>
                </td>
                <td>
                  <input
                    id='email'
                    placeholder='tape email'
                    className={((trySend && errorEmail) ? ' input-error' : '') + ((!errorEmail) ? 'input-ok' : '')}
                    onChange={handleChangeInputs}
                    value={email}>
                  </input>

                </td>
                <td>
                  <span className='message'>{(errorEmail) ? messages.email : <span className='mark-ok'>&#10003;</span>} </span>
                </td>
              </tr>
              <tr>
                <td className='left'>
                  <label htmlFor='password'>Your new password: </label>
                </td>
                <td>
                  <input
                    id='pass'
                    placeholder='password'
                    className={((trySend && errorPass) ? 'input-error' : '') + ((!errorPass) ? 'input-ok' : '')}
                    onChange={handleChangeInputs}
                    value={pass}
                  ></input>
                </td>
                <td>
                  <span className='message'>{(errorPass) ? messages.pass : <span className='mark-ok'>&#10003;</span>} </span>
                </td>
              </tr>
              <tr>
                <td colSpan='3' id='td-agree'>
                  <label htmlFor='agree'>
                    <input
                      type="checkbox"
                      id='agree'
                      checked={agree}
                      onChange={handleChangeInputs} />
                    <span style={(errorAgree && trySend) ? { color: 'red' } : null}> I accept term and condition </span>{(!errorAgree) ? <span className='mark-ok'>&#10003;</span> : null}
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan='3'>
                  <button type='submit' >Send</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {(sent) ? <div id='message'><span>You have successfully registered</span></div> : null}
      </div>

    </>
  )
}

export default App
