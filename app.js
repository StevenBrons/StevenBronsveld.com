/**
 * Module dependencies.
 */

var express = require("express"),
	lusca = require("lusca"),
	session = require("express-session"),
	http = require("http"),
	path = require("path");

var app = express();

var main = require("./routes/main");

app.set("port", process.env.PORT || 26194);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(session({
	secret: "8PFU4gvrNm5VzvYH",
	resave: true,
	saveUninitialized: true
}));

app.use(lusca.csp({ /* ... */ }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.p3p("ABCDEF"));
app.use(lusca.hsts({
	maxAge: 31536000
}));
app.use(lusca.xssProtection(true));
app.use(express.favicon(__dirname + "/public/favicon.ico"));
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

var serve = http.createServer(app);

if ("development" == app.get("env")) {
	app.use(express.errorHandler());
}

app.get("/", main.GET);

serve.listen(app.get("port"), function() {
	console.log("Express server listening on port " + app.get("port"));
});

//test