import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Animated } from 'react-native';
import CustomTextInput from '@/src/components/CustomTextInput';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/Theme';
import { globalStyles as GlobalStyles } from '@/constants/Theme';


export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      // Check for authentication error from context
      if (error) {
        // Error is already set in the AuthContext and will be displayed in the UI
        return;
      }
      // Only navigate on successful login
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Login error:', err);
      // No need for Alert as we're showing error from AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[GlobalStyles.container, { backgroundColor: colors.light }]}>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />
      
      <Animated.View 
        style={[
          GlobalStyles.formContainer, 
          GlobalStyles.centerContent,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[GlobalStyles.centerContent, GlobalStyles.mb4]}>
          <Text style={[GlobalStyles.title, { textAlign: 'center', color: colors.primary }]}>Let's Sign you in.</Text>
          <Text style={[GlobalStyles.subtitle, { marginTop: 8 }]}>Welcome back, You've been missed!</Text>
        </View>
        
        {error && (
          <View style={[GlobalStyles.card, { backgroundColor: colors.danger }, GlobalStyles.mb3, { width: '100%' }]}>
            <Text style={[GlobalStyles.errorText, { color: colors.white, textAlign: 'center' }]}>{error}</Text>
          </View>
        )}
        
        <View style={[GlobalStyles.inputContainer, { width: '100%', maxWidth: 400 }]}>
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
            secureTextEntry={!showPassword}
            error={passwordError}
            trailing={props => (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ padding: 8 }}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        
        <View style={[{ width: '100%', maxWidth: 400 }]}>
          <TouchableOpacity 
            style={[GlobalStyles.row, { justifyContent: 'flex-end' }, GlobalStyles.mb3]}
            onPress={() => router.push('/(auth)/forgot-password')}
          >
            <Text style={GlobalStyles.link}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[GlobalStyles.button, loading && GlobalStyles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={GlobalStyles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={[GlobalStyles.centerContent, GlobalStyles.my3]}>
            <Text style={GlobalStyles.subtitle}>Don't have an account?</Text>
          </View>

          <TouchableOpacity 
            style={GlobalStyles.secondaryButton}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={GlobalStyles.secondaryButtonText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

// Using GlobalStyles instead of local styles