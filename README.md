# :bike::bike: ECOBICI: Insights and Recommendations :bike::bike:

## Team Members
* Kenneth Andersen 🚴‍♂️ 
* Uriel Arriaga   🚴‍♂️
* Salvador del Cos  🚴‍♂️
* Mariana Geffroy López 🚴‍♀️
* Gustavo Maldonado  🚴‍♂️

## Project summary 
### What is Ecobici? 
ECOBICI is the public bicycle system of Mexico City that has integrated bikes as an essential part of mobility, aimed at inhabitants of the capital and tourists. Since its launch in 2010, Ecobici have provided over 71 million rides in central Mexico City: convenient, sustainable transportation that reduces traffic and pollution and promotes health.

Become a rider! Don't have your ecobici membership yet? [Sign up here] (https://www.ecobici.cdmx.gob.mx/es/registro/inicio)

### Project Goal
Apply data analysis tools to observe the evolution of the ECOBICI network and provide recommendations for its future development and growth.

## Original data Sources 📁 
The original data can be found in the following links: 
- **Ecobici CSV**: ECOBICI trip information by month. Files can be downloaded as CSVs. 
- **Ecobici API**: The ECOBICI API has information about the 480 stations ( station name, station id, location). 
- **Open Data Mexico City: Colonias**: Information about the neighborhoods in Mexico City.

## ETL process 
#### Extract
- Different datasets concerning our topic were located. Historical data was downloaded in CSV format from the Ecobici website, one file per month.
- Data for each station was downloaded using an the Ecobici API from their website.
#### Transform
- Python was used to unify all of the CSV files (10 years of monthly data) Resulting in 71 million lines. Another python script was used to clean the dataset.
- Given the size of the dataset, we created a subset of one in hundred, resulting in a sample of 710,000 data points.
#### Load
- Data was imported into Postgres.
- Queries regarding stations, general trips, routes and demographics were created.
- Each query was parsed using flask and SQL alchemy and was fed into the webpage using D3.

## Languages used 🖥️
- SQL 
- Javascript
- HTML 
- CSS 
- Python

## Analysis 📈
We decided to analyze demographic data of ECOBICI users as well as most common routes in the ECOBICI network. Different years were analyzed. 

## Preview 🚲
You can move freely around the webpage, so we invite you to explore the data! You can use the navbar, get different information to populate, graphs, tables and maps or whatever you prefer! Have fun!

![image](https://github.com/mgeffroy/P2-Ecobici_insights_and_recommendations/blob/main/static/Images/ecobici_tour_gif.gif)


## Conclusion summary 
- Most Ecobici users are men.
- Most users are in the 20-40 age range. 
- Some stations have traffic and in some areas some are underused. 
- Stations with more traffic are close to metro stations and supermarkets. 


