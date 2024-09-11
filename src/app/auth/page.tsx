'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabaseClient';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

export default function AuthPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Поле для подтверждения пароля (только для регистрации)
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // Флаг для переключения между входом и регистрацией
  const router = useRouter();

  // Регистрация
  const signUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    setErrorMessage(null); // Сброс ошибки перед новым запросом
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert('Check your email for the confirmation link');
    }

    setLoading(false);
  };

  // Вход
  const signIn = async () => {
    setLoading(true);
    setErrorMessage(null); // Сброс ошибки перед новым запросом
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      router.push('/dashboard'); // Редирект на страницу dashboard
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        width: '400px', // Фиксированная ширина формы
        margin: '0 auto', // Центрирование формы
      }}
    >
      <Typography variant="h4">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      {/* Показывать поле подтверждения пароля только при регистрации */}
      {isSignUp && (
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
      )}

      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        {isSignUp ? (
          <Button onClick={signUp} variant="contained" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        ) : (
          <Button onClick={signIn} variant="contained" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        )}
      </Box>

      {/* Кнопка для переключения между входом и регистрацией */}
      <Button onClick={() => setIsSignUp(!isSignUp)} variant="text">
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </Button>
    </Box>
  );
}
