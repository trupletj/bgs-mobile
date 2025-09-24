import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/theme';

export default function VerifyScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const colors = Colors.light;
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }

      // Auto-verify when all fields are filled
      if (index === 5 && value && newOtp.every(digit => digit !== '')) {
        handleVerifyOTP(newOtp.join(''));
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpCode?: string) => {
    const code = otpCode || otp.join('');

    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone!,
        token: code,
        type: 'sms',
      });

      if (error) {
        Alert.alert('Error', error.message);
        // Clear OTP on error
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      } else {
        // Navigate to main app
        router.replace('/(tabs)');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setResendLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone!,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setCountdown(60);
        Alert.alert('Success', 'OTP sent successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Verify OTP</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Enter the 6-digit code sent to {phone}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  borderColor: digit ? colors.primary : colors.border,
                  backgroundColor: colors.card,
                  color: colors.text,
                },
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.primary },
            loading && styles.buttonDisabled,
          ]}
          onPress={() => handleVerifyOTP()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={[styles.resendText, { color: colors.text }]}>
            Didn't receive the code?
          </Text>
          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={countdown > 0 || resendLoading}
            style={styles.resendButton}
          >
            {resendLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text
                style={[
                  styles.resendButtonText,
                  {
                    color: countdown > 0 ? colors.text + '60' : colors.primary,
                  },
                ]}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>
            Change Phone Number
          </Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    marginBottom: 8,
  },
  resendButton: {
    padding: 8,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
