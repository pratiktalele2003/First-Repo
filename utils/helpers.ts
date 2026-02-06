export function getAmount(str: string): number {
  const cleaned: string = str.replace(/[^0-9.]/g, '');
  return cleaned.includes('.') ? parseFloat(cleaned) : parseInt(cleaned, 10);
}
