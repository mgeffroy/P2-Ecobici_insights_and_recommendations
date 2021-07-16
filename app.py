import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, redirect,jsonify
from config import password


app = Flask(__name__)

#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://postgress:{password}@localhost:5432/')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

@app.route("/")
def index():
    test=1


@app.route("/stationdata/<yeardata>")
def scraper(yeardata):
    test=2

@app.route("/genderdata/<yeardata>")
def scraper(yeardata):
    test=2

@app.route("/coloniadata/<yeardata>")
def scraper(yeardata):
    test=2

@app.route("/routedata/<yeardata>")
def scraper(yeardata):
    test=2

if __name__ == "__main__":
    app.run(debug=True)
