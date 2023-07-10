import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../../form-button';
import * as styles from './add-carries-to-compare-dialog.module.scss';
import _ from 'lodash';

const AddCarriersToCompareDialog = ({
  open = false,
  setOpen,
  carriers,
  selectedCarriers,
  setCarriersToCompare,
  selectedLine,
  setSelectedLine,
}) => {
  const scroll = 'paper';
  const [carriersToAdd, setCarriersToAdd] = useState([]);
  const [searchString, setSearchString] = useState('');

  const handleChange = e => setSearchString(e.target.value);

  const handleCompare = () => {
    setCarriersToCompare([...selectedCarriers, ...carriersToAdd]);
    setCarriersToAdd([]);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeCarrierToAdd = carrierToRemove => {
    setCarriersToAdd(carriersToAdd.filter(c => c !== carrierToRemove));
  };

  const addCarrierToAdd = carrierToAdd => {
    selectedCarriers.length + carriersToAdd.length < 5 &&
      setCarriersToAdd([...carriersToAdd, carrierToAdd]);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const disabled = selectedCarriers.length + carriersToAdd.length > 4;
  const opacity = disabled ? '0.4' : '1';
  const lines = ['Auto', 'Home'];
  const byName = (carrierA, carrierB) => {
    const nameOf = carrier => carrier.data.name;
    if (nameOf(carrierA) > nameOf(carrierB)) {
      return 1;
    } else return -1;
  };
  useEffect(() => {
    setCarriersToAdd([]);
  }, [selectedLine]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{ paper: styles.compareDialog }}
    >
      <DialogTitle classes={{ root: styles.compareDialogTitle }} id="scroll-dialog-title">
        Add Carrier
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <Grid container direction="column">
          <Grid item xs>
            <div className={styles.lineSelectorContainer}>
              {lines.map((line, idx) => (
                <button
                  key={idx}
                  className={
                    selectedLine === line ? styles.lineButtonSelected : styles.lineButton
                  }
                  onClick={() => setSelectedLine(line)}
                >
                  {line}
                </button>
              ))}
            </div>
          </Grid>
          <Grid
            item
            xs
            style={{
              flex: 1,
              display: 'flex',
              borderRadius: '5px',
              marginBottom: '1em',
            }}
            classes={{ root: styles.compareDialogInput }}
          >
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              onChange={handleChange}
              style={{ flex: 1, paddingLeft: '10px' }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </Grid>
          <Grid container className={styles.compareDialogRow}>
            {carriersToAdd.map((c, idx) => {
              return (
                <Grid item key={idx} classes={{ root: styles.compareDialogTag }}>
                  {c}
                  <span
                    onClick={() => removeCarrierToAdd(c)}
                    className={styles.compareDialogTagClose}
                  >
                    <ClearIcon />
                  </span>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        {carriers.sort(byName).reduce((carriersToDisplay, currentCarrier) => {
          const { name } = currentCarrier.data;
          const searchRegExp =
            !!searchString && new RegExp(searchString.toLowerCase(), 'g');
          const hasntLine = carrier => {
            return _.isEmpty(
              carrier.data.Ratings.find(line => line.data.Line == selectedLine)
            );
          };
          if (
            selectedCarriers.includes(name) ||
            carriersToAdd.includes(name) ||
            (searchRegExp && !name.toLowerCase().match(searchRegExp)) ||
            hasntLine(currentCarrier)
          ) {
            return carriersToDisplay;
          }
          const currentCarrierNode = (
            <Grid
              key={carriersToDisplay.length}
              onClick={() => addCarrierToAdd(name)}
              container
              style={{ opacity }}
              classes={{ root: styles.compareDialogCarrier }}
            >
              <Grid classes={{ root: styles.compareDialogCarrierImage }} item xs={6}>
                <img
                  alt={`${name} Logo`}
                  className={styles.compareDialogGatsbyImageWrapper}
                  src={
                    currentCarrier.data.Company_Logos[0]?.data?.Attachments?.raw[0]
                      .thumbnails.small.url
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <span
                  className={styles.compareDialogTitle}
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {name}
                </span>
              </Grid>
            </Grid>
          );
          return [...carriersToDisplay, currentCarrierNode];
        }, [])}
      </DialogContent>
      <DialogActions classes={{ root: styles.compareDialogButtons }}>
        <Button onClick={handleClose} isOutline type="primary">
          Cancel
        </Button>
        <Button onClick={handleCompare} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddCarriersToCompareDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  carriers: PropTypes.array,
  selectedCarriers: PropTypes.array,
  setCarriersToCompare: PropTypes.func,
  selectedLine: PropTypes.string,
  setSelectedLine: PropTypes.func,
};

export default AddCarriersToCompareDialog;
