import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Button from '../../form-button';
import Input from '../../inputs/FormInput';
import * as styles from './zip-code-form.module.scss';

const ZipCodeForm = ({ className, handleSubmit, zipCode, setZipCode }) => {
  const [formZipCode, setFormZipCode] = useState(zipCode);

  const debounceSearch = useRef(
    _.debounce(zipCode => {
      setZipCode(zipCode);
    }, 250)
  );

  useEffect(() => {
    debounceSearch.current(formZipCode);
  }, [formZipCode]);

  return (
    <form className={classNames(styles.zipCodeForm, className)} onSubmit={handleSubmit}>
      <div className={styles.zipCodeFormInner}>
        <Input
          value={formZipCode}
          placeholder="Zip Code"
          onChange={e => setFormZipCode(e.target.value)}
        />
        <Button htmlType="submit" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};
ZipCodeForm.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  zipCode: PropTypes.string,
  setZipCode: PropTypes.func,
};
export default ZipCodeForm;
