/**
 * Central place to read light theme colors for components.
 */

import { Colors } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string },
  colorName: keyof typeof Colors.light
) {
  const colorFromProps = props.light;

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors.light[colorName];
}
