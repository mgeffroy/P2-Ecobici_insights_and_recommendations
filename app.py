import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, redirect,jsonify,render_template
from config import password
import datetime
import pandas as pd
from flask_cors import CORS

engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/ecobici')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def data():
    return render_template("data.html")

@app.route("/stationdata")
def stationdata():
    querystring="select * from Estaciones"
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict['ID']= element.e_id
        getdict['Name']= element.name
        getdict['LAT']= element.lat
        getdict['Lon']= element.lon
        getdict['districtName']= element.districtname
        jsondata.append(getdict) 

    return jsonify(jsondata)


@app.route("/genderdata/<yeardata>")
def genderdata(yeardata):
    test=2
@app.route("/viajesdata/<yeardata>")
def viajesdata(yeardata):
    yeardata=int(yeardata)
    yeardata2=yeardata+1
    querystring='select * from viajes where '+f"usage_timestamp >= '{yeardata}-01-01' and usage_timestamp <'{yeardata2}-01-01'"
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Genero_Usuario"]= element.genero_usuario
        getdict["Edad_Usuario"]= element.edad_usuario
        getdict["Ciclo_Estacion_Retiro"]= element.ciclo_estacion_retiro
        getdict["Ciclo_Estacion_Arribo"]= element.ciclo_estacion_arribo
        getdict["Usage_Timestamp"]= element.usage_timestamp
        getdict["Duration"]= element.duration
        jsondata.append(getdict)

    return jsonify(jsondata)



@app.route("/coloniadata/<yeardata>")
def colonias(yeardata):
    test=2

@app.route("/routedata/<yeardata>")
def routes(yeardata):
    yeardata=int(yeardata)
    yeardata2=yeardata+1

    querystring=f"""Select v.ciclo_estacion_retiro, v.ciclo_estacion_arribo, count(v.ciclo_estacion_arribo) as trips,
                    er.LAT as retiro_lat,er.LON as retiro_lon,
                    ea.LAT as arribo_lat, ea.LON as arribo_lon 
                    from Viajes v                   
                    left join Estaciones er
                    on v.ciclo_estacion_retiro=er.E_ID
                    left join Estaciones ea
                    on v.ciclo_estacion_arribo=ea.E_ID
					where usage_timestamp >= '{yeardata}-01-01' and usage_timestamp < '{yeardata2}-01-01'
                    group by v.ciclo_estacion_retiro,v.ciclo_estacion_arribo,retiro_lat,retiro_lon,
                    arribo_lat,arribo_lon 
                    order by trips desc
                    limit 250;"""

    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Ciclo_Estacion_Retiro"]=element.ciclo_estacion_retiro
        getdict["Ciclo_Estacion_Arribo"]=element.ciclo_estacion_arribo
        getdict["Trips"]=element.trips
        getdict["Retiro_Lat"]=element.retiro_lat
        getdict["Retiro_Lon"]=element.retiro_lon
        getdict["Arribo_Lat"]=element.arribo_lat
        getdict["Arribo_Lon"]=element.arribo_lon
        jsondata.append(getdict)

    return jsonify(jsondata)

if __name__ == "__main__":
    app.run(debug=True)
