import classNames from 'classnames';
import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types'
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import * as styles from '../components/scss/contactPage/contactPage.module.scss';
import Button from '../components/button/Button';
import { isEmail, isPhone } from '../utils/validation';
import { AlertsContext } from '../components/state/AlertsContext';

const ContactUs = () => {
  const initialFormData = {
    name: {
      value: '',
      label: 'Name',
      type: 'text',
      placeholer: 'John',
      autoComplete: 'name',
      error: '',
    },
    email: {
      value: '',
      label: 'Email',
      type: 'email',
      placeholer: 'john.doe@companyinc.com',
      autoComplete: 'email',
      error: '',
    },
    phone: {
      value: '',
      label: 'Phone',
      type: 'tel',
      placeholer: '+1 512 123 1234',
      autoComplete: 'tel',
      error: '',
    },
    city: {
      value: '',
      label: 'City',
      type: 'text',
      placeholer: 'Austin',
      autoComplete: 'address-level2',
      error: '',
    },
    state: {
      value: '',
      label: 'State',
      type: 'text',
      placeholer: 'Texas',
      autoComplete: 'address-level1',
      error: '',
    },
    message: {
      value: '',
      label: 'How can we help you?',
      type: 'textarea',
      placeholer: '',
      autoComplete: '',
      error: '',
    },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { dispatchAlert } = useContext(AlertsContext);
  const handleChange = (field, event) => {
    let fieldToUpdate = formData[field];
    fieldToUpdate.value = event.target.value;
    setFormData({ ...formData, [field]: { ...fieldToUpdate } });
  };
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    let data = Object.entries(formData);
    let errors = {};
    for (let index = 0; index < data.length; index++) {
      let [field, content] = data[index];
      if (field === 'message') {
        continue;
      }
      if (!content.value) {
        errors[field] = 'Field is empty';
      }
      if (field === 'email') {
        if (!isEmail(content.value)) {
          errors[field] = 'Please add a valid email';
        }
      }
      if (field === 'phone') {
        if (!isPhone(content.value)) {
          errors[field] = 'Please add a valid phone number';
        }
      }
    }
    if (Object.entries(errors).length) {
      let newFormData = JSON.parse(JSON.stringify(formData));
      for (let index = 0; index < Object.entries(newFormData).length; index++) {
        let field = Object.entries(newFormData)[index][0];
        newFormData[field].error = errors[field];
      }
      dispatchAlert('Please review your information');
      setLoading(false);
    } else {
      const webHook = 'https://hook.integromat.com/8bvrntu75t9pg2r4xp54wdt81nqdi4wp';
      fetch(webHook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(formData),
      }).then(res => {
        if (res.ok) {
          setLoading(false);
          setSubmitted(true);
        }
      });
    }
  };
  return (
    <Layout>
      <SEO title="Contact Us" url="/contact-us" />
      <div className={styles.columnContainer}>
        <h1 className={styles.heroTitle}>Contact Us</h1>
        <p className={styles.description}>
          Call{' '}
          <a title="Call us" href="tel:+15313334700">
            531-333-4700
          </a>{' '}
          or fill out the form to get in touch.
        </p>
        <hr className={styles.hr} />
        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.contactUsForm}>
            {Object.entries(formData).map((field, idx) => (
              <div key={idx} className={styles.inputContainer}>
                <label htmlFor={field[0]}>{field[1].label} </label>
                {field[1].type === 'textarea' ? (
                  <textarea
                    rows="5"
                    className={classNames(
                      styles.input,
                      field[1].error ? styles.inputError : '',
                      field[1].type === 'textarea' ? styles.textarea : ''
                    )}
                    type={field[1].type}
                    name={field[0]}
                    value={field[1].value}
                    placeholder={field[1].placeholer}
                    onChange={e => handleChange(field[0], e)}
                    autoComplete={field[1].autoComplete}
                  />
                ) : (
                  <input
                    className={classNames(
                      styles.input,
                      field[1].error ? styles.inputError : ''
                    )}
                    required
                    type={field[1].type}
                    name={field[0]}
                    value={field[1].value}
                    placeholder={field[1].placeholer}
                    onChange={e => handleChange(field[0], e)}
                    autoComplete={field[1].autoComplete}
                  />
                )}
                <span className={styles.formError}>{field[1].error}</span>
              </div>
            ))}
            <Button disabled={loading} className={styles.submitBtn}>
              Submit
            </Button>
          </form>
        ) : (
          <h3 className={styles.thankYouMessage}>Thanks! We’ll be in touch soon!</h3>
        )}
      </div>
    </Layout>
  );
};

// ContactUs.propTypes = {

// }

export default ContactUs;
