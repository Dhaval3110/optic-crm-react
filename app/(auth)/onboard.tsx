import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors, typography, spacing, shadows, borderRadius } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardScreen() {
  const router = useRouter();
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: false,
      }} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.illustrationContainer}>
            <View style={styles.blockGrid}>
              <View style={[styles.block, styles.blockPrimary]} />
              <View style={[styles.block, styles.blockSecondary]} />
              <View style={[styles.block, styles.blockAccent]} />
            </View>
            <View style={styles.securityIconsContainer}>
              <View style={styles.securityIcon}>
                <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
              </View>
              <View style={styles.securityIcon}>
                <Ionicons name="lock-closed" size={24} color={colors.primary} />
              </View>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>OpticCRM</Text>
            <Text style={styles.subtitle}>Streamline customer relationships, elevate business success</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  illustrationContainer: {
    width: '100%',
    aspectRatio: 1,
    marginTop: spacing['4xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  block: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  blockPrimary: {
    backgroundColor: colors.primary,
    transform: [{ rotate: '15deg' }],
  },
  blockSecondary: {
    backgroundColor: colors.secondary,
    transform: [{ rotate: '-10deg' }],
  },
  blockAccent: {
    backgroundColor: colors.accent,
    transform: [{ rotate: '5deg' }],
  },
  securityIconsContainer: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: spacing['2xl'],
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.xl,
    color: colors.gray[600],
    textAlign: 'center',
    maxWidth: '80%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    paddingVertical: spacing.xl,
  },
  signInButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  signInButtonText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  registerText: {
    fontSize: typography.sizes.base,
    color: colors.gray[600],
  },
  registerLink: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
});