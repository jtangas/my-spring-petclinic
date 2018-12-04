import bcrypt from 'bcrypt';

async function hashPassword(password) {
  return await bcrypt.hash(password, 10).then(hash => hash);
}

export {
  hashPassword,
};
