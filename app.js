let express = require("express"),
app     = express(),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
expressSanitizer = require("express-sanitizer"),
methodOverride = require('method-override'),
path = require('path');

mongoose.connect("mongodb://localhost/todo_app");
app.use(express.static('./public'));
app.use('/todos/new/', express.static('public')); //for every route needs the static to be specified in express 
app.use('/todos/:id/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

var todoSchema = new mongoose.Schema({
  text: String,
});

var Todo = mongoose.model("Todo", todoSchema);

app.get("/", function(req, res){
  res.redirect("/todos");
});

app.get("/todos", function(req, res){
  Todo.find({}, function(err, todos){
    if(err){
      console.log(err);
    } else {
      if(req.xhr){ // if request made is from XmlHttpRequest/Ajax
        res.json(todos);
      }
      else{
        console.log(todos);
        res.render("index", {todos: todos}); 
      }
    }
  })
});

app.get("/todos/new", function(req, res){
  res.render("new"); 
});

app.post("/todos", function(req, res){
  console.log(req.body);
  if(req.body.todo){
    req.body.todo.text = req.sanitize(req.body.todo.text);
  }
  var formData = req.body.todo;
  Todo.create(formData, function(err, newTodo){
    if(err){
      res.render("new");
    } else {
        res.json(newTodo);
    }
  });
});

app.get("/todos/:id/", function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    if(err){
      console.log(err);
      res.redirect("/")
    } else {
      console.log('Success', todo);
      res.json(todo);
    }
  });
});

app.put("/todos/:id", function(req, res){
  Todo.findByIdAndUpdate(req.params.id, req.body.todo, {new: true}, function(err, todo){
    if(err){
      console.log(err);
    } else {
        res.json(todo);
   }
  });
});


app.delete("/todos/:id", function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err, todo){
    if(err){
      console.log(err);
    } else {
      if(req.xhr){
        res.json(todo);
      }else{
        res.redirect("/todos");
      }
    }
  }); 
});


app.listen(3000, function() {
  console.log('Server running on port 3000');
});

// // Uncomment the three lines of code below and comment out or remove lines 84 - 86 if using cloud9
// app.listen(process.env.PORT, process.env.IP, function(){
  //     console.log("The server has started!");
  // });
  