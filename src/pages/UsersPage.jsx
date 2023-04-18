import React, { useState } from 'react';
import { usePageError } from '../hooks/usePageError.js';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { caesarShift } from '../utils/Caesar.js';
import { xorCode } from '../utils/xor.js';
import SnackbarContent from '@mui/material/SnackbarContent';

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'The text is encrypted...';
    }

    return 'Your message';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export const UsersPage = () => {
  const [error, setError] = usePageError('');
  const [message, setMessage] = useState('');
  const [method, setMethod] = useState('');
  const [step, setStep] = useState(1);
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [isDecipher, setIsDecipher] = useState(false);

  const clear = () => {
    setMessage('');
  }

  const save = () => {
    let res;

    if (method === 'caesar') {
      res = caesarShift(message, step);
    } 

    if (method === 'xor') {
      res = xorCode(message);
    } 

    setEncryptedMessage(res);
    setIsDecipher(false);
  }

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  const handleChangeStep = (event) => {
    setStep(event.target.value);
  };

  const decipher = () => {
    setEncryptedMessage(message);
    setIsDecipher(true);
  }

  return (
    <div className="content">
      <h1 className="title">Message encryption</h1>
      <Box component="form" noValidate autoComplete="off" sx={{ m: 3 }} >
      <FormControl sx={{ width: '100ch' }}>
        <OutlinedInput placeholder="Please enter the text in English"  value={message}  onChange={(event) => {
              setMessage(event.target.value);
            }} />
        <MyFormHelperText />
      </FormControl>
    </Box >

    <div style={{display: 'flex'}}>
      <Box sx={{ m: 3 }} >
        <FormControl sx={{ width: '30ch' }}>
          <InputLabel id="demo-simple-select-label">Choose an encryption method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={method}
              label="choose an encryption method"
              onChange={handleChange}
            >
              <MenuItem value={'caesar'}>Caesar</MenuItem>
              <MenuItem value={'xor'}>xor</MenuItem>
            </Select>
        </FormControl>
      </Box>

    {method === 'caesar' && (
      <Box sx={{ m: 3 }} >
      <FormControl sx={{ width: '15ch' }}>
        <InputLabel id="demo-simple-select-label">Choose a shift step</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={step}
          label="choose an encryption method"
          onChange={handleChangeStep}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
    )}
  </div>

    <Stack spacing={2} direction="row" sx={{ m: 3 }} >
      <Button variant="contained" onClick={save}>Save</Button>
      <Button variant="outlined" onClick={clear}>Clear</Button>
    </Stack>

    {encryptedMessage.length > 0 && (
      <>
      <h3>Your message:</h3>
        <div style={{display: 'flex', height: '30px', alignItems: 'center'}} sx={{ m: 3 }}>
          <Stack spacing={2} sx={{ maxWidth: 600, m: 3 }}>
            <SnackbarContent message={encryptedMessage} />
          </Stack>
         {isDecipher 
           ? (
            <Button variant="outlined" onClick={save}>Encrypt</Button>
           )
            : (
              <Button variant="outlined" onClick={decipher}>Decipher</Button>
            )}
        </div>
      </>
    )}

      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
