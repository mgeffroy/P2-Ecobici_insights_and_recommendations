import numpy as np
import sqlalchemy
import os
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask,jsonify,render_template
#from config import password
import datetime
import pandas as pd
from flask_cors import CORS
import ast
# engine = create_engine('')

url_base = os.environ.get('DATABASE_URL', '')
new_base = url_base[:8]+'ql'+ url_base[8:]
engine = create_engine(new_base)
reduction_ratio=100
routesnum=250
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

@app.route("/demographics")
def demographics():
    return render_template("demographics.html")

@app.route("/routes")
def routespage():
    return render_template("routes.html")

@app.route("/s_map")
def smappage():
    return render_template("s_map.html")

@app.route("/usage")
def usagepage():
    return render_template("usage.html")

@app.route("/about")
def aboutpage():
    return render_template("about.html")

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

@app.route("/viajesdatafull")
def viajesdatafull():
    querystring='select * from viajes'
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


@app.route("/yearlyByGender/")
def yearlyByGender():
    data=engine.execute("select * from yearlybygender")
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Gender"]= element.Gender
        getdict["Year"]= element.Year
        getdict["Count"]= element.Count #*reduction_ratio#multiplied by 100 to reflect true userbase size
        jsondata.append(getdict)
    return jsonify(jsondata)


@app.route("/genderfullmonthdata/")
def fullmonthlygender():
    querystring="""select extract(month from usage_timestamp) as usage_month, genero_usuario, count(genero_usuario) as users  from viajes
                group by usage_month,genero_usuario
                order by usage_month"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Genero_Usuario"]= element.genero_usuario
        getdict["Usage_Month"]= element.usage_month
        getdict["User_Count"]= element.users*reduction_ratio #multiplied by 100 to reflect true userbase size
        jsondata.append(getdict)
    return jsonify(jsondata)



@app.route("/yearMonthlyByGender/<yeardata>")
def yearMonthlyByGender(yeardata):
    yeardata=int(yeardata)
    querystring=f"""select * from monthlybygender
                where level_0 = '{yeardata}'"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Gender"]= element.Gender
        getdict["Month"]= element.Month
        getdict["Count"]= element.Count#*reduction_ratio#multiplied by 100 to reflect true userbase size
        jsondata.append(getdict)
    return jsonify(jsondata)   

@app.route("/coloniadata")
def colonias():
    querystring="select * from colonias"
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["nombre"]=element.NAME
        getdict["geo_shape"]=ast.literal_eval(element.GeoShape)
        getdict["alcaldia"]=element.Alcaldia
        jsondata.append(getdict)
    return jsonify(jsondata)


@app.route("/routesByYear/<yeardata>")
def routesByYear(yeardata):
    querystring=f"""select * from routesbyyear
                where level_0 = '{yeardata}'"""
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

@app.route("/demoRange")
def demoRange():
    querystring="""select * from demorange
                order by demorange.range"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        if element.range!="other":
            getdict["Range"]=element.range
            getdict["Count"]=element.Count#*reduction_ratio#multiplied by 100 to reflect true userbase size
            getdict["Gender"]=element.Gender
        jsondata.append(getdict)

    return jsonify(jsondata)  

@app.route("/demoAge")
def demoAge():
    querystring='select * from demoage'
    querystring="""select * from demoage
                order by demoage.age"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Count"]=element.Count#*reduction_ratio#multiplied by 100 to reflect true userbase size
        getdict["Age"]=element.age
        jsondata.append(getdict)
    return jsonify(jsondata)


if __name__ == "__main__":
    app.run(debug=True)
#testing to update again