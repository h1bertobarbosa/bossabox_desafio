export default {
  secret: process.env.APP_SECRET || 'default_hash_asdhasd6as5d46sad5',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
