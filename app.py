import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask,jsonify,render_template
from config import password
import datetime
import pandas as pd
from flask_cors import CORS
import ast

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

@app.route("/demographics")
def demographics():
    return render_template("demographics.html")

@app.route("/routes")
def routespage():
    return render_template("routes.html")

@app.route("/smap")
def smappage():
    return render_template("smap.html")

@app.route("/usage")
def usagepage():
    return render_template("usage.html")

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

@app.route("/yearlygenderdata/")
def yearlygender():
    querystring="""select extract(year from usage_timestamp) as usage_year, genero_usuario, count(genero_usuario) as users  from viajes
                    group by usage_year,genero_usuario
                    order by usage_year"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Genero_Usuario"]= element.genero_usuario
        getdict["Usage_Year"]= element.usage_year
        getdict["User_Count"]= element.users*100#multiplied by 100 to reflect true userbase size
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
        getdict["User_Count"]= element.users*100 #multiplied by 100 to reflect true userbase size
        jsondata.append(getdict)
    return jsonify(jsondata)

@app.route("/genderyearmonthdata/<yeardata>")
def yearmonthlygender(yeardata):
    yeardata=int(yeardata)
    querystring=f"""select extract(month from usage_timestamp) as usage_month, genero_usuario, count(genero_usuario) as users  from viajes
                where usage_timestamp >= '{yeardata}-01-01' and usage_timestamp < '{yeardata+1}-01-01'
                group by usage_month,genero_usuario
                order by usage_month"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Genero_Usuario"]= element.genero_usuario
        getdict["Usage_Month"]= element.usage_month
        getdict["User_Count"]= element.users*100#multiplied by 100 to reflect true userbase size
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

@app.route("/demographicsrange")
def demographicsdata():
    querystring="""select (case when edad_usuario >= 10 and edad_usuario < 20 then '10-19'
             when edad_usuario >= 20 and edad_usuario < 30 then '20-29'
             when edad_usuario >= 30 and edad_usuario < 40 then '30-39'
             when edad_usuario >= 40 and edad_usuario < 50 then '40-49'
             when edad_usuario >= 50 and edad_usuario < 60 then '50-59'
             when edad_usuario >= 60 and edad_usuario < 70 then '60-69'
             when edad_usuario >= 70 and edad_usuario < 80 then '70-79'
	         when edad_usuario >= 80 and edad_usuario < 90 then '80-89'
             else 'other' end) as range, count(*) as user_counts, genero_usuario
            from viajes
            group by genero_usuario, (case when edad_usuario >= 10 and edad_usuario < 20 then '10-19'
             when edad_usuario >= 20 and edad_usuario < 30 then '20-29'
             when edad_usuario >= 30 and edad_usuario < 40 then '30-39'
             when edad_usuario >= 40 and edad_usuario < 50 then '40-49'
             when edad_usuario >= 50 and edad_usuario < 60 then '50-59'
             when edad_usuario >= 60 and edad_usuario < 70 then '60-69'
             when edad_usuario >= 70 and edad_usuario < 80 then '70-79'
	         when edad_usuario >= 80 and edad_usuario < 90 then '80-89'
             else 'other' end);"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        if element.range!="other":
            getdict["Rango_Edad"]=element.range
            getdict["Cantidad_Usuarios"]=element.user_counts*100#multiplied by 100 to reflect true userbase size
            getdict["Genero_Usuario"]=element.genero_usuario
        jsondata.append(getdict)

    return jsonify(jsondata)    

@app.route("/demographicsage")
def demographicsagedata():
    querystring="""select edad_usuario ,count(*)*100 as user_counts from viajes
            group by edad_usuario"""
    data=engine.execute(querystring)
    jsondata=[]
    for element in data:
        getdict={}
        getdict["Cantidad_Usuarios"]=element.user_counts*100#multiplied by 100 to reflect true userbase size
        getdict["Edad_Usuario"]=element.edad_usuario
        jsondata.append(getdict)
    return jsonify(jsondata)
if __name__ == "__main__":
    app.run(debug=True)
#testing to update again