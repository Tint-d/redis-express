import { genSalt, hash, compare } from "bcrypt";
const saltRounds = 10;

export const generateHashedPassword = async (plainPassword: string) => {
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(plainPassword, salt);
  return hashedPassword;
};

export const compareHashedPassword = async (
  passwordInput: string,
  hashedPassword: string
) => {
  console.log(passwordInput, hashedPassword);

  return await compare(passwordInput, hashedPassword);
};
