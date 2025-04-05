import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, ScrollView } from 'react-native';
import { GlobalStyles } from '@/src/styles/GlobalStyles';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/Theme';
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
  const [showPassword, setShowPassword] = useState(false);
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
    <View style={GlobalStyles.container}>
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
            style={GlobalStyles.mx2}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
        )
      }} />

      <ScrollView 
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[GlobalStyles.formContainer, { opacity: fadeAnim }]}>
          <View style={GlobalStyles.inputContainer}>
          <CustomTextInput
            label="First Name"
            placeholder="First Name"
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
            placeholder="Last Name"
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
            placeholder="Shop Name (optional)"
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
            placeholder="City (optional)"
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
            placeholder="Email"
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
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            error={passwordError}
          />

          <CustomTextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            error={confirmPasswordError}
          />
        </View>

        <View style={[{ width: '100%', maxWidth: 400 }]}>
          <TouchableOpacity 
            style={[GlobalStyles.button, loading && GlobalStyles.buttonDisabled]} 
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={GlobalStyles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>


        </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
// Using GlobalStyles instead of local styles
