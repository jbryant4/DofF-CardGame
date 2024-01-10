export default function hasSpecialCharacters(value: string) {
  const regex = /[!@#$%^&*(),.?":{}|<>]/g;

  return regex.test(value);
}
