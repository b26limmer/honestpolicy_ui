import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';

export default function SomethingWrongDialog({ open, setOpen }) {
  const scroll = 'paper';

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const width =
    typeof window !== 'undefined'
      ? window.innerWidth > 600
        ? 600
        : window.innerWidth
      : 600;
  const iframeWidth = width - (32 + 24) * 2;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdDSfFfdrvzxHHBU9ndBpwNY2XgDC-PrQRLlAWOz50FPr-Pvw/viewform?embedded=true"
              width={iframeWidth}
              height="705"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
SomethingWrongDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
