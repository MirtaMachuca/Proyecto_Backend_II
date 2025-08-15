
class ViewsController {
    renderLogin(req, res) {
        res.render('login', { /* Puedes pasar flash messages aquí */ });
    }
    renderRegister(req, res) {
        res.render('register');
    }
    renderProfile(req, res) {
        res.render('profile', { user: req.user }); 
    }
    renderIndex(req, res) {
        res.render('index');
    }

    renderForgotPassword(req, res) {
        res.render('forgot-password');
    }

    renderResetPassword(req, res) {
        const { token } = req.params;
        res.render('reset-password', { token }); 
    }
}
module.exports = new ViewsController();