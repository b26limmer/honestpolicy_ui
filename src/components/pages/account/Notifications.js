import React, { useEffect } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import BreadCrumbs from './BreadCrumbs';
import Switch from '../../inputs/Switch/Switch';
import Select from '../../inputs/Select/Select';
import Button from '../../../components/button/Button';

import * as styles from '../../scss/account/notification.module.scss';

const Notifications = ({ updateBreadcrumbs }) => {
  useEffect(() => {
    updateBreadcrumbs({ displayName: 'Notifications', link: '/account/notifications' });
  }, []);
  return (
    <>
      <BreadCrumbs firstCrumb="Account Settings" secondCrumb="Notification" />
      <div className={styles.profileNotifications}>
        <div className={styles.profileNotificationsInner}>
          <div className={styles.profileNotificationsForm}>
            <Formik
              initialValues={{
                newsletter: '',
                rate: '',
                rates: '',
              }}
              validate={values => {
                const errors = {};

                const requiredValues = ['rates'];

                requiredValues.forEach(item => {
                  if (!values[item]) {
                    errors[item] = 'Required field';
                  }
                });

                return errors;
              }}
              validateOnChange={false}
              onSubmit={(values, { setSubmitting }) => {}}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Switch
                    type="checkbox"
                    name="newsletter"
                    label="Weekly Newsletter"
                    checked={values.newsletter}
                    onChange={handleChange}
                  />
                  <Switch
                    type="checkbox"
                    name="rate"
                    label="Rate Watcher updates"
                    checked={values.rate}
                    onChange={handleChange}
                  />
                  <Select
                    hasError={errors.rates}
                    name="rates"
                    label="Check rates"
                    value={values.rates}
                    options={[
                      { value: '1', text: 'Once a month' },
                      { value: '2', text: '2' },
                      { value: '3', text: '3' },
                    ]}
                    onChange={handleChange}
                  />
                  <div className={styles.profileNotificationsSubmit}>
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
Notifications.propTypes = {
  updateBreadcrumbs: PropTypes.func.isRequired,
};
export default Notifications;
