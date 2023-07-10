import React, { useState } from 'react';
import classNames from 'classnames';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Rating from '@mui/material/Rating';
import * as styles from './quotes-collapse.module.scss';
import PropTypes from 'prop-types';

function Reviewed({ reviewd }) {
  if (reviewd == 'Your Review') {
    return (
      <div className={styles.quotesCollapseItemDownSide}>
        <div className={styles.quotesCollapseItemPrice}>{reviewd.review}</div>
        <div className={styles.quotesCollapseItemPrice}></div>
        <Rating
          name="read-only"
          value={3}
          readOnly
          classes={{
            root: styles.quotesCollapseItemRating,
          }}
        />
        <div className={styles?.quotesCollapseItemIcon}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.quotesCollapseItemDownSide}>
        <div className={styles.quotesCollapseItemPrice}>{reviewd.review}</div>
        <div className={styles.quotesCollapseItemPrice}></div>

        <div className={styles?.quotesCollapseItemIcon}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
    );
  }
}

const QuotesCollapse = ({ item, columns }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (item.review == 'Your Review') {
      setOpen(!open);
    } else {
      setOpen(open);
    }
  };

  return (
    <div className={styles.quotesCollapse}>
      <ListItem
        classes={{
          root: styles.quotesCollapseItem,
          button: styles.quotesCollapseItemButton,
        }}
        button
        onClick={handleClick}
      >
        <div className={styles.quotesCollapseItemName}>
          <label>
            {item.name}
            <span>June6,2021</span>
          </label>
        </div>

        <Reviewed reviewd={item}></Reviewed>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItem classes={{ gutters: styles.quotesCollapseItemPadding }} button>
            <div className={styles.quotesCollapseItemTable}>
              <div className={styles.quotesCollapseItemHeader}>
                {columns?.map((item, key) => (
                  <div key={key} className={styles.quotesCollapseItemHeaderCell}>
                    {item.text}
                  </div>
                ))}
              </div>
              <div className={styles.quotesCollapseItemBody}>
                {item?.rows?.map((item, key) => {
                  return (
                    <div key={key} className={styles.quotesCollapseItemRow}>
                      <div>
                        {item?.items.map((item, key) => {
                          return (
                            <div
                              key={key}
                              className={classNames(styles.quotesCollapseItemTableCell)}
                            >
                              {item?.text}
                            </div>
                          );
                        })}
                      </div>
                      <Divider />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.quotesCollapseItemTable}>
              <div className={styles.quotesCollapseItemHeader}>
                <Box component="span" className={styles.quotesCollapseBox}>
                  27 people found your review helpful
                </Box>
              </div>

              <div className={styles.quotesCollapseItemBody}>
                {item?.secondrow?.map((item, key) => {
                  {
                    if (item.name != 'Customer Service Feedback') {
                      return (
                        <div key={key} className={styles.quotesCollapseItemRow}>
                          <div>
                            {item?.items.map((item, key) => {
                              return (
                                <div
                                  key={key}
                                  className={classNames(
                                    styles.quotesCollapseItemTableCell
                                  )}
                                >
                                  {item?.text}
                                </div>
                              );
                            })}
                          </div>

                          <Divider />
                        </div>
                      );
                    } else {
                      return (
                        <div key={key} className={styles.quotesCollapseItemBox}>
                          <div>
                            {item?.items.map((item, key) => {
                              return <div key={key}>{item?.text}</div>;
                            })}
                          </div>

                          <Divider />
                        </div>
                      );
                    }
                  }
                })}
              </div>
            </div>
          </ListItem>
          <div>
            <label className={styles.quotesCollapseclickabletext}>
              <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
              Edit Review
            </label>
            {/* <label className={styles.quotesCollapseclickabletext}> Edit Review</label> */}
          </div>
        </List>

        <div className={styles.quotesCollapseMobile}>
          <div className={styles.quotesCollapseMobileTable}>
            {item?.rows.map((item, key) => {
              return (
                <div key={key} className={styles.quotesCollapseMobileRow}>
                  <div className={styles.quotesCollapseMobileRowHeader}>{item.name}</div>

                  <div className={styles.quotesCollapseMobileList}>
                    {item.items.map((rowItem, key) => {
                      return (
                        <div key={key} className={styles.quotesCollapseMobileListItem}>
                          <div className={styles.quotesCollapseMobileListItemKey}>
                            {columns[key]?.text}
                          </div>

                          <div className={styles.quotesCollapseMobileListItemValue}>
                            {rowItem?.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

QuotesCollapse.propTypes = {
  item: PropTypes.object,
  columns: PropTypes.array,
};
Reviewed.propTypes = {
  reviewd: PropTypes.object,
};

export default QuotesCollapse;
