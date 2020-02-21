import React, {Component} from 'react'
import './App.css'

const formValid = ({formErrors, ...rest}) => {
  let valid = true
  Object.values(formErrors).forEach(val => {
    if(val.length > 0) {
      valid = false
    }
  })
  Object.values(rest).forEach(val => {
    if(val === null) {
      valid = false
    }
  })
  return valid
}

const emailRegex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)

class App extends Component {
  constructor() {
    super()
    this.state = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      formErrors: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First name: ${this.state.firstname}
        Last name: ${this.state.lastname}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `)
    }
    else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    let formErrors = this.state.formErrors

    switch(name) {
      case 'firstname':
        formErrors.firstname = value.length < 3 ? 'Minimum 3 characters required' : ''
        break
      case 'lastname':
        formErrors.lastname = value.length < 3 ? 'Minimum 3 characters required' : ''
        break
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'Invalid email address'
        break
      case 'password':
        formErrors.password = value.length < 8 ? 'Minimum 8 characters required' : ''
        break
      default:
        break
    }
    this.setState({
      formErrors, [name]: value
    })
  }

  render() {
    const {formErrors} = this.state
    return(
      <div className="container">
        <div className="form-container">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="firstname">
              <label htmlFor="firstname">First Name</label>
              <input type="text" placeholder="firstname" name="firstname" noValidate onChange={this.handleChange} />
              {formErrors.firstname.length > 0 && (
                <span className="error-message">{formErrors.firstname}</span>
              )}
            </div>
            <div className="lastname">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" placeholder="lastname" name="lastname" noValidate onChange={this.handleChange} />
              {formErrors.lastname.length > 0 && (
                <span className="error-message">{formErrors.lastname}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">First Name</label>
              <input type="email" placeholder="email" name="email" noValidate onChange={this.handleChange} />
              {formErrors.email.length > 0 && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="password" name="password" noValidate onChange={this.handleChange} />
              {formErrors.password.length > 0 && (
                <span className="error-message">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default App;