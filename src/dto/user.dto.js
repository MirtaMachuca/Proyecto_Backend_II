const toUserDto = (user) => {
  if (!user) return null;

  return {
    id: user._id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
  };
};

export { toUserDto };