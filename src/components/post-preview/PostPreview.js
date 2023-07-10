import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from './post-preview.module.scss';

const PostPreview = ({ Image, title, link, isLong }) => {
  return (
    <a
      href={link}
      title={title}
      target="_blank"
      rel={'noopener noreferrer'}
      className={classNames(styles.postPreview, { [styles.postPreviewLong]: isLong })}
    >
      <div className={styles.postPreviewImage}>
        <Image />
      </div>
      <div>
        <div className={styles.postPreviewTitle}>{title}</div>
        <p className={styles.articleName}>Read Article</p>
      </div>
    </a>
  );
};

PostPreview.propTypes = {
  Image: PropTypes.func,
  title: PropTypes.string,
  link: PropTypes.string,
  alt: PropTypes.string,
  isLong: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
};

export default PostPreview;
