"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contact_1 = __importDefault(require("../models/contact"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const util_1 = require("../util");
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/portfolio', function (req, res, next) {
    res.render('index', { title: 'Our Portfolio', page: 'portfolio', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/team', function (req, res, next) {
    res.render('index', { title: 'Our Team', page: 'team', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/blog', function (req, res, next) {
    res.render('index', { title: 'Blog', page: 'blog', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/blogPost', function (req, res, next) {
    res.render('index', { title: 'Blog Post', page: 'blogPost', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/events', function (req, res, next) {
    res.render('index', { title: 'Our Past Events', page: 'events', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/gallery', function (req, res, next) {
    res.render('index', { title: 'Our Gallery', page: 'gallery', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/eventPlanning', function (req, res, next) {
    res.render('index', { title: 'Event Planning', page: 'eventPlanning', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/statistics', function (req, res, next) {
    res.render('index', { title: 'Statistics', page: 'statistics', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/terms', function (req, res, next) {
    res.render('index', { title: 'Terms of Service', page: 'terms', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/privacyPolicy', function (req, res, next) {
    res.render('index', { title: 'Privacy Policy', page: 'privacyPolicy', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: (0, util_1.UserDisplayName)(req) });
    }
    return res.redirect('/eventPlanning');
});
router.post('/login', function (req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end();
        }
        if (!user) {
            req.flash('/loginMessage', 'Authentication Error');
            return res.redirect('login');
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end();
            }
            res.redirect('./eventPlanning');
        });
    })(req, res, next);
});
router.get('/register', function (req, res, next) {
    if (req.user) {
        res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: (0, util_1.UserDisplayName)(req) });
        res.redirect('/eventPlanning');
    }
});
router.post('/register', function (req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + "" + req.body.lasttName
    });
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error("Error: User Already Exists");
                req.flash("registerMessage", "Registration Error");
            }
            req.flash("registerMessage", "Server Error");
            res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, function () {
            return res.redirect('/eventPlanning');
        });
    });
});
router.get('/logout', function (req, res, next) {
    req.logOut(function (err) {
        if (err) {
            console.error(err);
            res.end();
        }
        res.redirect('/local');
    });
});
router.get('/add', util_1.AuthGuard, function (req, res, next) {
    res.render('index', { title: 'Add Contact', page: 'edit', contact: '', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/edit/:id', util_1.AuthGuard, function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id).then(function (contactToEdit) {
        res.render('index', { title: 'Edit Contact', page: 'edit',
            contact: contactToEdit, displayName: '' });
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.get('/delete/:id', util_1.AuthGuard, function (req, res, next) {
    let id = req.params.id;
    contact_1.default.deleteOne({ _id: id }).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.post('/edit/:id', util_1.AuthGuard, function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new contact_1.default({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.updateOne({ _id: id }, updatedContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
router.post('/add/', util_1.AuthGuard, function (req, res, next) {
    let newContact = new contact_1.default({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    router.get('/contact-list', util_1.AuthGuard, function (req, res, next) {
        contact_1.default.find().then(function (data) {
            res.render('index', { title: 'Contact List', page: 'contact-list',
                contacts: data, displayName: '' });
        }).catch(function (err) {
            console.error("Encountered an Error reading from the database " + err);
            res.end();
        });
    });
    contact_1.default.create(newContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end();
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map