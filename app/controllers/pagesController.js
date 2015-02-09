var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

//LowDB Datbase Setup
low = require('lowdb');
db = low('db.json');

var pagesController = new Controller();

//pages#main (GET)
pagesController.main = function(){
  this.db = db;
  db.save();
  //If 'date/dd/mm/yyyy' route is supplied, pull in dates, else put in today's date
  var today = new Date();
  if ( this.param('day')===undefined ){ this.dd = today.getDate(); } else { this.dd = this.param('day'); }
  if ( this.param('month')===undefined ){ this.mm = today.getMonth()+1; } else { this.mm = this.param('month'); }
  if ( this.param('year')===undefined ){ this.yyyy = today.getFullYear(); } else { this.yyyy = this.param('year'); }
  
  this.start_hour = 6; //work day begins @ 6AM
  this.end_hour = 18; //work day ends @ 6PM
  var hour_count = this.end_hour - this.start_hour;
  
  //this.dd+"_"+this.mm+"_"+this.yyyy
  this.day_array = [];
  for (i = this.start_hour; i <= this.end_hour; i++){  
    try{
      this.day_array.push( db(this.mm+"_"+this.dd+"_"+this.yyyy).find({ hour: String(i) }).booked_by );
    }
    catch(err){
      this.day_array.push("OPEN");
      }
  }
  
  //this.lol = db("7_2_2015").find({ hour: '6' }).booked_by;
  
  //Dirty date validation
  if ((this.param('day') > 31) || (this.param('month') > 12) || (this.param('year') > 2015)){
    this.render('baddate'); } 
  else { 
    this.render(); }
}

//pages#write (GET)
pagesController.write = function() {
  this.db = db;
  h = this.param('hour'); //Hour in day
  user = this.param('user'); //Name
  date = this.param('date'); //Booking date
  
  db(date).push({ hour: h, booked_by: user});
  this.redirect('/');
}; //Probably would be better via post or some other method for db writing and form submission

//pages#cancel (GET)
pagesController.cancel = function() {
  this.db = db;
  h = this.param('hour'); //Hour in day
  user = this.param('user'); //Name
  date = this.param('date'); //Booking date
  
  db(date).remove({ hour: h, booked_by: user});
  db.save();
  
  this.redirect('/');
}; //Probably would be better via post or some other method for db writing and form submission

module.exports = pagesController;
