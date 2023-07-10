import React, { useContext, useState } from 'react';
import InfoText from '../../InfoText';
import * as styles from '../../scss/ourPartners/strategic-partners.module.scss';
import Button from '../../button/Button';
import { isEmail, isPhone } from '../../../utils/validation';
import classNames from 'classnames';
import { AlertsContext } from '../../state/AlertsContext';
import { StaticImage } from 'gatsby-plugin-image';

const StrategicPartners = () => {
  const initialFormData = {
    firstName: {
      value: '',
      label: 'First name',
      type: 'text',
      placeholer: 'John',
      error: '',
    },
    lastName: {
      value: '',
      label: 'Last name',
      type: 'text',
      placeholer: 'Doe',
      error: '',
    },
    companyName: {
      value: '',
      label: 'Company Name',
      type: 'text',
      placeholer: 'Company Inc',
      error: '',
    },
    email: {
      value: '',
      label: 'Email',
      type: 'email',
      placeholer: 'john.doe@companyinc.com',
      error: '',
    },
    phone: {
      value: '',
      label: 'Phone',
      type: 'tel',
      placeholer: '+1 512 123 1234',
      error: '',
    },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { dispatchAlert } = useContext(AlertsContext);
  const partnerImages = [
    {
      Img: () => (
        <StaticImage
          width={130}
          placeholder="tracedSVG"
          formats={['auto', 'webp']}
          layout="constrained"
          objectFit="contain"
          backgroundColor="transparent"
          src="../../../images/logos/q2.png"
          alt="Q2"
        />
      ),
    },
    {
      Img: () => (
        <StaticImage
          height={180}
          placeholder="tracedSVG"
          formats={['auto', 'webp']}
          layout="constrained"
          quality={99}
          objectFit="contain"
          src="../../../images/logos/applied-logo.png"
          alt="Applied"
        />
      ),
    },
    {
      Img: () => (
        <StaticImage
          height={100}
          placeholder="tracedSVG"
          formats={['auto', 'webp']}
          layout="constrained"
          quality={99}
          objectFit="contain"
          src="../../../images/logos/first-state-bank-nebraska-logo.png"
          alt="First State"
        />
      ),
    },
    {
      Img: () => (
        <StaticImage
          height={200}
          placeholder="tracedSVG"
          formats={['auto', 'webp']}
          layout="constrained"
          quality={99}
          objectFit="contain"
          src="../../../images/logos/assurity-logo.png"
          alt="Assurity"
        />
      ),
    },
    {
      Img: () => (
        <StaticImage
          height={200}
          placeholder="tracedSVG"
          formats={['auto', 'webp']}
          layout="constrained"
          quality={99}
          objectFit="contain"
          src="../../../images/logos/nelnet-logo.png"
          alt="Nelnet"
        />
      ),
    },
  ];
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
      setFormData(newFormData);
      setLoading(false);
    } else {
      const webHook = 'https://hook.integromat.com/re2zxb8pvx0defgu7ap61tf682dv9l61';
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
    <div className={styles.columnContainer}>
      <h2 className={styles.sectionTitle}>Who We Are</h2>
      <p className={styles.text}>
        We believe that deep tech integrations will result in significant net new revenue
        for banks and organizations. Our partnerships and integrations allow us to handle
        all product lines under one house to maximize lifetime value and customer
        retention.
      </p>
      <InfoText
        text="How our direct integration with Q2 creates a new revenue paradigm"
        helpText="Test"
      />
      <div className={styles.partnerImagesContainer}>
        {partnerImages.map(({ Img }, idx) => (
          <div key={idx} className={styles.logoContainer}>
            <Img />
          </div>
        ))}
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formLogo}>
          <StaticImage
            placeholder="blurred"
            blurredOptions={{ width: 40, toFormat: 'png' }}
            src="../../../images/logos/hpDoubleShield.png"
            alt="HP shield logo"
          />
          <StaticImage
            placeholder="tracedSVG"
            src="../../../images/logos/hpLetterLogo.png"
            alt="HP letter logo"
          />
        </div>
        <h4 className={styles.formTitle}>
          {!submitted
            ? 'Get in touch with Honest Policy or call (531) 333-4700.'
            : 'Thanks! We’ll be in touch soon!'}
        </h4>
        <hr />
        {!submitted && (
          <form className={styles.partnerForm}>
            {Object.entries(formData).map((field, idx) => (
              <div key={idx} className={styles.inputContainer}>
                <label htmlFor={field[0]}>{field[1].label} </label>
                <input
                  className={classNames(
                    styles.input,
                    field[1].error ? styles.inputError : ''
                  )}
                  required
                  name={field[0]}
                  value={field[1].value}
                  placeholder={field[1].placeholer}
                  onChange={e => handleChange(field[0], e)}
                />
                <span className={styles.formError}>{field[1].error}</span>
              </div>
            ))}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className={styles.submitBtn}
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StrategicPartners;
