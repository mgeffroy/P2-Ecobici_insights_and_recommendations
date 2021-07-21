import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, redirect,jsonify
from config import password
import pandas as pd
engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/Ecobici_db')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Base.classes.keys()
viajes=Base.classes.Viajes
estaciones=Base.classes.Estaciones
app = Flask(__name__)

#################################################
# Database Setup
#################################################


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

@app.route("/")
def index():
    test=1


@app.route("/stationdata/")
def stations(yeardata):
    session = Session(engine)
    test=session.query(estaciones).all()
    jsonget=[]
    for element in test:
      #print(f"Coords:[{element.LAT},{element.LON}] with ID number {element.ID}")
        testdict={}
        testdict["ID"]=element.ID
        testdict["LAT"]=element.LAT
        testdict["LON"]=element.LON
        testdict["districtName"]=element.districtName
        testdict["NAME"]=element.NAME
        
        jsonget.append(testdict)

    return jsonify(jsonget)

@app.route("/genderdata/<yeardata>")
def genders(yeardata):
    test=2

@app.route("/coloniadata/<yeardata>")
def colonias(yeardata):
    test=2

@app.route("/routedata/<yeardata>")
def routes(yeardata):
    test=2

if __name__ == "__main__":
    app.run(debug=True)
