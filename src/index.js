import React, {createRef} from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import {SnackbarProvider} from "notistack";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const notistackRef = createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}

ReactDOM.render(
  <SnackbarProvider
    ref={notistackRef}
    maxSnack={3}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    action={(key) => (
      <IconButton size="small" aria-label="fechar" color="inherit" onClick={onClickDismiss(key)}>
        <CloseIcon fontSize="small"/>
      </IconButton>
    )}
  >
    <App/>
  </SnackbarProvider>,
  document.getElementById('root'));

serviceWorker.unregister();
