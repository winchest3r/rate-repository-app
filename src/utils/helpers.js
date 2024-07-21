export const simplifyNumber = (number) => {
  if (number < 1000) {
    return number;
  }
  const div = Math.floor(number / 1000);
  const rem = Math.round(number % 1000 / 100);

  return div + (rem ? '.' + rem : '') + 'k';
}