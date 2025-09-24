import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const colors = Colors.light;

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (!registerNumber.trim()) {
      Alert.alert('Error', 'Please enter your register number');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.trim(),
        options: {
          data: {
            register_number: registerNumber.trim(),
          },
        },
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        router.push({
          pathname: '/auth/verify',
          params: { phone: phone.trim() },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Sign In</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Enter your phone number and register number to receive an OTP
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Phone Number</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.text,
              },
            ]}
            value={phone}
            onChangeText={setPhone}
            placeholder="+1234567890"
            placeholderTextColor={colors.text + '60'}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoComplete="tel"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Register Number</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.text,
              },
            ]}
            value={registerNumber}
            onChangeText={setRegisterNumber}
            placeholder="Enter your register number"
            placeholderTextColor={colors.text + '60'}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.primary },
            loading && styles.buttonDisabled,
          ]}
          onPress={handleSendOTP}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Send OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
