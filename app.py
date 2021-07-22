import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, redirect,jsonify
from config import password
import pandas as pd
engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/ecobici')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
app = Flask(__name__)



@app.route("/")
def index():
    test=1


@app.route("/stationdata/")
def stationdata(yeardata):
    querystring="select * from Estaciones"
    data=engine.execute(querystring)
    return jsonify(data)


@app.route("/genderdata/<yeardata>")
def genderdata(yeardata):
    test=2
@app.route("/viajesdata/<yeardata>")
def viajesdata(yeardata):
    querystring=f'select genero_usuario as"Genero_Usuario"+,edad_usuario as "Edad_Usuario", ciclo_estacion_retiro as "Ciclo_Estacion_Retiro", ciclo_estacion_arribo as "Ciclo_Estacion_Arribo", usage_timestamp as "Usage_Timestamp", duration as "Duration" from viajes where '+f"usage_timestamp >= '{yeardata}-01-01' and usage_timestamp <'{yeardata+1}-01-01'"
    data=engine.execute(querystring)
    return jsonify(data)



@app.route("/coloniadata/<yeardata>")
def colonias(yeardata):
    test=2

@app.route("/routedata/<yeardata>")
def routes(yeardata):
    querystring="""Select v.ciclo_estacion_retiro, v.ciclo_estacion_arribo, count(v.ciclo_estacion_arribo) as trips,
                    er.LAT as retiro_lat,er.LON as retiro_lon,
                    ea.LAT as arribo_lat, ea.LON as arribo_lon 
                    from Viajes v                   
                    left join Estaciones er
                    on v.ciclo_estacion_retiro=er.E_ID
                    left join Estaciones ea
                    on v.ciclo_estacion_arribo=ea.E_ID
					where usage_timestamp >= '2014-01-01' and usage_timestamp < '2015-01-01'
                    group by v.ciclo_estacion_retiro,v.ciclo_estacion_arribo,retiro_lat,retiro_lon,
                    arribo_lat,arribo_lon 
                    order by trips desc
                    limit 250;"""

    data=engine.execute(querystring)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
