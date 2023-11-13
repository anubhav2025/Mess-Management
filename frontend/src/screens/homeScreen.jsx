import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
} from '@mui/material';

const AuthPage = () => {
  const [signIn, setSignIn] = useState(true);

  const handleToggle = () => {
    setSignIn((prev) => !prev);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '100px' }}>
        <Typography component="h1" variant="h5">
          {signIn ? 'Sign In' : 'Sign Up'}
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {!signIn && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {signIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={handleToggle}>
              {signIn
                ? 'Don\'t have an account? Sign Up'
                : 'Already have an account? Sign In'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AuthPage;
