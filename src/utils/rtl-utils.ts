export function getTextAlignment(isRTL: boolean): string {
  return isRTL ? 'text-right' : 'text-left';
}

export function getFlexAlignment(isRTL: boolean): string {
  return isRTL ? 'flex-row-reverse' : 'flex-row';
}

export function getMarginDirection(isRTL: boolean, direction: 'l' | 'r'): string {
  if (isRTL) {
    return direction === 'l' ? 'mr' : 'ml';
  }
  return direction === 'l' ? 'ml' : 'mr';
}