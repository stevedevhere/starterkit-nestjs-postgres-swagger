export function isPhoneNumber(value: string): boolean {
  const trimmedValue = value.trim();
  if (!(/^\d/.test(trimmedValue)) && !(/^\+/.test(trimmedValue)) && !(/^\(/.test(trimmedValue))) {
    return false;
  }
  const phone = trimmedValue.replace(/\s|\+|\(|\)|-/g, '');

  return (/^[0-9]{10}$/g.test(phone) || /^[0-9]{11}$/g.test(phone) || /^[0-9]{12}$/g.test(phone));
}

export function formatPhoneNumber(value) {
  const phone = value.trim().replace(/^00/, '').replace(/\s|\+|\(|\)|-/g, '');
  if (phone.length === 10) {
    return phone.replace(/(\d{2})(\d)(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
  }
  if (phone.length === 11) {
    return phone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
  }
  if (phone.length === 12) {
    return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
  }
  return null;
}
