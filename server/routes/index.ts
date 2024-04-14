
import express from 'express'
const router = express.Router();
import Contact from '../models/contact'
import passport from "passport";
import User from '../models/user';
import {AuthGuard, UserDisplayName} from "../util";

/* GET home page. */
/** TOP-LEVEL ROUTES **/

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home', displayName : UserDisplayName(req) });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home', displayName : UserDisplayName(req) });
});

router.get('/portfolio', function(req, res, next) {
  res.render('index', { title: 'Our Portfolio', page : 'portfolio', displayName : UserDisplayName(req) });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services', page : 'services', displayName : UserDisplayName(req) });
});

router.get('/team', function(req, res, next) {
  res.render('index', { title: 'Our Team', page : 'team', displayName : UserDisplayName(req) });
});

router.get('/blog', function(req, res, next) {
  res.render('index', { title: 'Blog', page : 'blog', displayName : UserDisplayName(req) });
});

router.get('/blogPost', function(req, res, next) {
  res.render('index', { title: 'Blog Post', page : 'blogPost', displayName : UserDisplayName(req) });
});

router.get('/events', function(req, res, next) {
  res.render('index', { title: 'Our Past Events', page : 'events', displayName : UserDisplayName(req) });
});

router.get('/gallery', function(req, res, next) {
  res.render('index', { title: 'Our Gallery', page : 'gallery', displayName : UserDisplayName(req) });
});

router.get('/eventPlanning', function(req, res, next) {
  res.render('index', { title: 'Event Planning', page : 'eventPlanning', displayName : UserDisplayName(req) });
});

router.get('/statistics', function(req, res, next) {
  res.render('index', { title: 'Statistics', page : 'statistics', displayName : UserDisplayName(req) });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page : 'contact', displayName : UserDisplayName(req) });
});

router.get('/terms', function(req, res, next) {
  res.render('index', { title: 'Terms of Service', page : 'terms', displayName : UserDisplayName(req) });
});

router.get('/privacyPolicy', function(req, res, next) {
  res.render('index', { title: 'Privacy Policy', page : 'privacyPolicy', displayName : UserDisplayName(req) });
});


/** AUTHENCATION ROUTES  **/
router.get('/login', function(req, res, next) {
  if(!req.user){
    res.render('index', { title: 'Login', page : 'login', messages: req.flash('loginMessage'), displayName : UserDisplayName(req) });
  }
  return res.redirect('/eventPlanning');

});

router.post('/login', function (req, res, next){
  passport.authenticate('local', function (err: Error, user: Express.User, info: string) {
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


router.get('/register', function(req, res, next) {
  if(req.user){
    res.render('index', { title: 'Register', page : 'register',  messages: req.flash('registerMessage'), displayName : UserDisplayName(req) });
    res.redirect('/eventPlanning');
  }

});

router.post('/register', function (req, res, next){
  let newUser = new User({
    username: req.body.username,
    EmailAddress: req.body.emailAddress,
    DisplayName: req.body.firstName + "" + req.body.lasttName
  });

  User.register(newUser, req.body.password, function (err){
    if(err){
      if(err.name == "UserExistsError"){
        console.error("Error: User Already Exists");
        req.flash("registerMessage", "Registration Error");
      }
      req.flash("registerMessage", "Server Error");
      res.redirect('/register');
    }
    return passport.authenticate('local')(req, res, function () {
      return res.redirect('/eventPlanning');
    });
  });
});

router.get('/logout', function (req, res, next){
  req.logOut(function (err){
    if(err){
      console.error(err);
      res.end();
    }
    res.redirect('/local');
  });
});


/** CONTRACT ROUTES **/
router.get('/add', AuthGuard, function(req, res, next) {
  res.render('index', { title: 'Add Contact', page : 'edit', contact : '', displayName : UserDisplayName(req) });
});
router.get('/edit/:id', AuthGuard, function(req, res, next) {

  let id = req.params.id;

  Contact.findById(id).then(function (contactToEdit){
    res.render('index', { title: 'Edit Contact', page : 'edit',
      contact: contactToEdit, displayName : '' });

  }).catch(function(err) {
    console.error(err);
    res.end();
  });

});

router.get('/delete/:id', AuthGuard,  function(req, res, next) {

  let id = req.params.id;

  Contact.deleteOne({_id : id}).then(function (){
    res.redirect('/contact-list')
  }).catch(function(err) {
    console.error(err);
    res.end();
  });

});

router.post('/edit/:id', AuthGuard, function(req, res, next){

  let id = req.params.id;

  let updatedContact = new Contact(
      {
        "_id" : id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
      }
  );

  Contact.updateOne( {_id: id}, updatedContact).then(function() {
    res.redirect('/contact-list');
  }).catch(function(err) {
    console.error(err);
    res.end();
  });

});

router.post('/add/', AuthGuard, function(req, res, next){

   let newContact = new Contact(
      {
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
      }
  );

  router.get('/contact-list', AuthGuard, function(req, res, next) {

    Contact.find().then( function (data: any){
      res.render('index', { title: 'Contact List', page : 'contact-list',
        contacts: data, displayName : '' });
    }).catch(function(err : any) {
      console.error("Encountered an Error reading from the database " + err);
      res.end();
    })
  });


  Contact.create(newContact).then(function() {
    res.redirect('/contact-list');
  }).catch(function(err) {
    console.error(err);
    res.end();
  });

})


export default router;
