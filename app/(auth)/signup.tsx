import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors, typography, spacing, shadows, borderRadius } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '@/src/components/CustomTextInput';

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shopName, setShopName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [shopNameError, setShopNameError] = useState('');
  const [cityError, setCityError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
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

  const handleSignup = async () => {
    let isValid = true;
    
    // Reset errors
    setFirstNameError('');
    setLastNameError('');
    setShopNameError('');
    setCityError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate first name
    if (!firstName) {
      setFirstNameError('First name is required');
      isValid = false;
    }

    // Validate last name
    if (!lastName) {
      setLastNameError('Last name is required');
      isValid = false;
    }

    // Shop name is optional, no validation needed

    // City is optional, no validation needed

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

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    try {
      // TODO: Implement signup logic here
      console.log('Signup with:', { firstName, lastName, shopName, city, email, password });
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Create Account',
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          color: colors.white,
        },
        headerLeft: () => (
          <TouchableOpacity 
            style={[styles.backButton, { marginLeft: -spacing.sm }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
        )
      }} />

      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>

        
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setFirstNameError('');
            }}
            autoCapitalize="words"
            error={firstNameError}
          />

          <CustomTextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setLastNameError('');
            }}
            autoCapitalize="words"
            error={lastNameError}
          />

          <CustomTextInput
            label="Shop Name"
            value={shopName}
            onChangeText={(text) => {
              setShopName(text);
              setShopNameError('');
            }}
            autoCapitalize="words"
            error={shopNameError}
          />

          <CustomTextInput
            label="City"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              setCityError('');
            }}
            autoCapitalize="words"
            error={cityError}
          />

          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            error={emailError}
          />
          
          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry
            error={passwordError}
          />

          <CustomTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            secureTextEntry
            error={confirmPasswordError}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
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
    justifyContent: 'flex-start',
    padding: spacing.xl,
    paddingTop: spacing.md,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
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
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.dark,
    width: '100%',
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
  validationError: {
    color: colors.danger,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  inputError: {
    borderColor: colors.danger,
    borderWidth: 1,
  },
});