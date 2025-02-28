import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ActivityIndicator, Alert, Animated } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors, typography, spacing, shadows, borderRadius } from '@/constants/Theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signIn, error } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasLength = password.length >= 8;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return hasLength && hasSpecial && hasNumber && hasLetter;
  };

  const handleLogin = async () => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one special character, one number, and one letter');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />
      
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>OpticCRM</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            placeholder="Email"
            placeholderTextColor={colors.gray[400]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError && <Text style={styles.validationError}>{emailError}</Text>}
          
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="Password"
            placeholderTextColor={colors.gray[400]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry
          />
          {passwordError && <Text style={styles.validationError}>{passwordError}</Text>}
        </View>
        
        <TouchableOpacity 
          style={styles.forgotPasswordButton}
          onPress={() => console.log('Navigate to forgot password')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>Don't have an account?</Text>
        </View>

        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => console.log('Navigate to signup')}
        >
          <Text style={styles.signupButtonText}>Create an account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing['2xl'],
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.gray[600],
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    fontSize: typography.sizes.base,
    color: colors.dark,
    ...shadows.sm,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  buttonDisabled: {
    backgroundColor: colors.gray[400],
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  errorContainer: {
    backgroundColor: colors.danger,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
  },
  errorText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  inputError: {
    borderColor: colors.danger,
    borderWidth: 1,
  },
  validationError: {
    color: colors.danger,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  signupButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    ...shadows.sm,
  },
  signupButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerText: {
    color: colors.gray[600],
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});