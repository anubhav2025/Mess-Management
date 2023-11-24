import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Container, Typography } from '@mui/material';

import { useCreateComplaintsMutation } from '../../state/api';
import { toast } from "react-toastify";
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(3),
    minWidth: 300,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ComplaintForm = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createComplaint, { isLoading }] = useCreateComplaintsMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createComplaint({ title, description }).unwrap();
      console.log("Hello");
      toast.success("Complaint registered");
      // navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Complaint Form
      </Typography>
      <form className={classes.form}>
        <TextField
          id="complaint-title"
          label="Complaint Title"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ marginBottom: '20px' }}></div>
        <TextField
          id="complaint-description"
          label="Complaint Description"
          multiline
          rows={6}
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={submitHandler}
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>

        {isLoading && <Loader />}

      </form>
    </Container>
  );
};

export default ComplaintForm;
