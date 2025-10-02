import { Box } from '@/components/ui/box';
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { SendIcon } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { z } from 'zod';

const loginSchema = z.object({
  phone: z
    .string({error: 'Phone number is required' })
    .min(8, 'Утасны дугаар 8 оронтой байх ёстой')
    .max(8, 'Phone number must be at most 15 characters'),
  registerNumber: z
    .string()  
    .nonempty('Register number is required')  
    .min(3, 'Register number must be at least 3 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const colors = Colors.dark;
  const placeholderColor = useMemo(() => `${colors.icon}99`, [colors.icon]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      registerNumber: '',
    },
  });

  const handleSendOTP = async (values: LoginFormValues) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: values.phone.trim(),
        options: {
          data: {
            register_number: values.registerNumber.trim(),
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes('phone')) {
          setError('phone', { message: error.message });
        } else if (error.message.toLowerCase().includes('register')) {
          setError('registerNumber', { message: error.message });
        } else {
          Alert.alert('Error', error.message);
        }
        return;
      }

      router.push({
        pathname: '/auth/verify',
        params: { phone: values.phone.trim() },
      });
    } catch {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Box className="flex-1  px-6 py-12">
        <Box className="flex-1 items-center justify-center">
          <Box className="w-full max-w-md gap-10">
            <Box className="gap-3">
              <Heading size="3xl" className="text-center text-typography-900">
                Тавтай морил!
              </Heading>
              <Text className="text-center text-base leading-6 text-typography-600">
                Утасны дугаар болон регистрийн дугаараа оруулна уу.
              </Text>
            </Box>

            <Box className="gap-6">
              <Box className="gap-2">
                <Text className="text-xl uppercase tracking-wide text-typography-500">
                  Утасны дугаар
                </Text>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      size="xl"
                      isDisabled={isSubmitting}
                      isInvalid={Boolean(errors.phone)}
                    >
                      <InputField
                        keyboardType="phone-pad"
                        autoComplete="tel"
                        returnKeyType="next"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Утасны дугаар..."
                        placeholderTextColor={placeholderColor}
                      />
                    </Input>
                  )}
                />
                {errors.phone ? (
                  <Text className="text-xs text-error-500">{errors.phone.message}</Text>
                ) : null}
              </Box>

              <Box className="gap-2">
                <Text className="text-xl uppercase tracking-wide text-typography-500">
                  Регистрийн дугаар
                </Text>
                <Controller
                  control={control}
                  name="registerNumber"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      size="xl"
                      isDisabled={isSubmitting}
                      isInvalid={Boolean(errors.registerNumber)}
                    >
                      <InputField
                        autoCapitalize="characters"
                        returnKeyType="done"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Жш нь: УА90001122"
                        placeholderTextColor={placeholderColor}
                        onSubmitEditing={handleSubmit(handleSendOTP)}
                      />
                    </Input>
                  )}
                />
                {errors.registerNumber ? (
                  <Text className="text-xs text-error-500">
                    {errors.registerNumber.message}
                  </Text>
                ) : null}
              </Box>
            </Box>

            <Box className="gap-3">
              <Button
                onPress={handleSubmit(handleSendOTP)}
                disabled={isSubmitting}
                variant="solid"
                size="xl"
                action="primary"
              >
                {isSubmitting ? (
                  <ButtonSpinner />
                ) : (
                  <ButtonIcon as={SendIcon} />
                )}
                <ButtonText>Илгээх</ButtonText>
              </Button>

              <Text className="text-center text-xs text-typography-600">
                We&apos;ll never share your information. You&apos;ll get a secure one-time passcode to continue.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}
