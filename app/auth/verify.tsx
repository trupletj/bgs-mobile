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
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { RefreshCwIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  TextInputKeyPressEventData,
} from 'react-native';
import { z } from 'zod';

const OTP_LENGTH = 6;

type CodeFieldPath = `code.${number}`;

const verifySchema = z.object({
  code: z
    .array(z.string().regex(/^$|^\d$/, 'Зөвхөн цифр оруулна уу'))
    .length(OTP_LENGTH)
    .refine(
      (values) => values.every((digit) => digit.trim().length === 1),
      '6 оронтой баталгаажуулах кодыг оруулна уу.'
    ),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

type InputRef = React.ComponentRef<typeof InputField> | null;

export default function VerifyScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [countdown, setCountdown] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<InputRef[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    reset,
    watch,
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: Array(OTP_LENGTH).fill(''),
    },
  });

  const codeValues = watch('code');

  const filledDigits = useMemo(() => codeValues.filter((digit) => digit !== '').length, [
    codeValues,
  ]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((value) => value - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (filledDigits === OTP_LENGTH && !isSubmitting) {
      void handleSubmit(onVerify)();
    }
  }, [filledDigits, handleSubmit, isSubmitting, onVerify]);

  const handleDigitChange = (
    rawValue: string,
    index: number,
    onChange: (value: string) => void
  ) => {
    const sanitized = rawValue.replace(/[^0-9]/g, '');

    if (!sanitized) {
      onChange('');
      setValue(`code.${index}` as const, '', {
        shouldValidate: false,
        shouldDirty: true,
      });
      return;
    }

    const characters = sanitized.split('').slice(0, OTP_LENGTH - index);
    onChange(characters[0]);
    setValue(`code.${index}` as CodeFieldPath, characters[0], {
      shouldValidate: false,
      shouldDirty: true,
    });

    let nextIndex = index;

    characters.slice(1).forEach((char, offset) => {
      const targetIndex = index + offset + 1;
      if (targetIndex < OTP_LENGTH) {
        setValue(`code.${targetIndex}` as CodeFieldPath, char, {
          shouldValidate: false,
          shouldDirty: true,
        });
        nextIndex = targetIndex;
      }
    });

    if (index < OTP_LENGTH - 1) {
      const focusIndex = Math.min(nextIndex + 1, OTP_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleDigitKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === 'Backspace' && !codeValues[index] && index > 0) {
      const previousIndex = index - 1;
      setValue(`code.${previousIndex}` as CodeFieldPath, '', {
        shouldValidate: false,
        shouldDirty: true,
      });
      inputRefs.current[previousIndex]?.focus();
    }
  };

  const onVerify = useCallback(async ({ code }: VerifyFormValues) => {
    const token = code.join('');

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone!,
        token,
        type: 'sms',
      });

      if (error) {
        setError('code', { message: error.message }, { shouldFocus: false });
        reset({ code: Array(OTP_LENGTH).fill('') });
        inputRefs.current[0]?.focus();
        return;
      }

      router.replace('/(tabs)');
    } catch {
      Alert.alert('Error', 'Failed to verify OTP');
    }
  }, [phone, reset, setError]);

  const handleResendOTP = async () => {
    if (countdown > 0 || resendLoading) {
      return;
    }

    setResendLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone!,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      setCountdown(60);
      reset({ code: Array(OTP_LENGTH).fill('') });
      inputRefs.current[0]?.focus();
      Alert.alert('Success', 'OTP sent successfully');
    } catch {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const countdownLabel = countdown > 0 ? `Дахин илгээх (${countdown}s)` : 'OTP-г дахин илгээх';

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
                Баталгаажуулалт
              </Heading>
              <Text className="text-center text-base leading-6 text-typography-600">
                {phone ? `${phone} дугаар руу илгээсэн 6 оронтой кодыг оруулна уу.` :
                'Таны утсанд очсон 6 оронтой кодыг оруулна уу.'}
              </Text>
            </Box>

            <Box className="gap-4">
              <Box className="flex-row justify-between gap-3">
                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                  <Controller
                    key={index}
                    control={control}
                    name={`code.${index}` as const}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        size="sm"
                        isDisabled={isSubmitting}
                        isInvalid={Boolean(errors.code)}
                        className="h-14 w-14 rounded-2xl border-2"
                      >
                        <InputField
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          className="text-center text-2xl font-bold text-typography-900"
                          value={value}
                          onBlur={onBlur}
                          onKeyPress={(event) => handleDigitKeyPress(event, index)}
                          onChangeText={(text) => handleDigitChange(text, index, onChange)}
                          keyboardType="number-pad"
                          returnKeyType={index === OTP_LENGTH - 1 ? 'done' : 'next'}
                          maxLength={OTP_LENGTH}
                          selectTextOnFocus
                        />
                      </Input>
                    )}
                  />
                ))}
              </Box>
              {errors.code ? (
                <Text className="text-center text-xs text-error-500">
                  {errors.code.message}
                </Text>
              ) : null}
            </Box>

            <Box className="gap-3">
              <Button
                onPress={handleSubmit(onVerify)}
                disabled={isSubmitting}
                variant="solid"
                size="xl"
                action="primary"
              >
                {isSubmitting ? <ButtonSpinner /> : <ButtonIcon as={RefreshCwIcon} />}
                <ButtonText>Код баталгаажуулах</ButtonText>
              </Button>

              <Box className="items-center gap-2">
                <Text className="text-sm text-typography-500">
                  Код ирээгүй юу?
                </Text>
                <Button
                  onPress={handleResendOTP}
                  disabled={countdown > 0 || resendLoading}
                  variant="link"
                  action="primary"
                  size="sm"
                >
                  {resendLoading ? <ButtonSpinner /> : <ButtonText>{countdownLabel}</ButtonText>}
                </Button>
              </Box>
            </Box>

            <Button
              onPress={() => router.back()}
              variant="link"
              action="primary"
              size="sm"
            >
              <ButtonText>Утасны дугаараа засах</ButtonText>
            </Button>
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}
