const isAdmin = (req, res, next) => {};

const isSuperAdmin = (req, res, next) => {
  try {
    if (req.user) {
      if (req.user?.role == "CEO") {
        console.log(req.user.role);
        
        return next();
      } else {
        return res
          .status(403)
          .json({ message: "You do not have permission to access this" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports ={isSuperAdmin}