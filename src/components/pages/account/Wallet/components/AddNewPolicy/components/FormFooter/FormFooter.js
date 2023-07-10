import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './formFooter.module.scss';
import FormButton from '../../../../../../../form-button/FormButton';

const FormFooter = ({
  canSubmit,
  nextActionText,
  returnButtonText,
  onSubmit,
  onReturn,
}) => {
  return (
    <div className={styles.formFooterContainer}>
      <button className={styles.returnButton} onClick={onReturn}>
        {returnButtonText}
      </button>
      <FormButton
        className={styles.submitButton}
        onClick={onSubmit}
        disabled={!canSubmit}
      >
        {nextActionText}
      </FormButton>
    </div>
  );
};
FormFooter.defaultProps = {
  returnButtonText: 'Cancel',
  nextActionText: 'Continue',
};
FormFooter.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  nextActionText: PropTypes.string,
  returnButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onReturn: PropTypes.func.isRequired,
};

export default FormFooter;
