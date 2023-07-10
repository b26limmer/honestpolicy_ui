const createPassword = (length = 12) =>
  new Array(length)
    .fill()
    .map(() => String.fromCharCode(Math.random() * 86 + 40))
    .join('');
export default createPassword;
