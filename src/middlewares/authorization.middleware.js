const checkRole = (roles) => {
  return (req, res, next) => {

    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Acceso no autorizado.' });
    }

    // Si el rol del usuario está incluido en la lista de roles permitidos, continúa
    if (roles.includes(req.user.role)) {
      next();
    } else {
      // Si no tiene el rol, envía un error 403 Forbidden
      return res.status(403).json({ message: 'Acceso denegado. No tienes los permisos necesarios.' });
    }
  };
};


const isAdmin = checkRole(['ADMIN']);
const isUser = checkRole(['USER']);
const isAdminOrPremium = checkRole(['ADMIN', 'PREMIUM']);

export {
  checkRole,
  isAdmin,
  isUser,
  isAdminOrPremium,
};