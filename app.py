from flask import Flask, render_template, redirect


app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/phone_app"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/phone_app")


@app.route("/")
def index():
    test=1


@app.route("/stationdata")
def scraper():
    test=2

@app.route("/genderdata")
def scraper():
    test=2

@app.route("/coloniadata")
def scraper():
    test=2

@app.route("/routedata")
def scraper():
    test=2

if __name__ == "__main__":
    app.run(debug=True)
