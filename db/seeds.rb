# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

doctors = Doctor.create([
  {name: "Dr. Parnian Zandieh", address: "160 East 32nd Street", city: "New York", state: "NY", zipcode: 10016}, 
  {name: "Dr. Haleh Mohseni", address: "2015 Grand Concourse", city: "Bronx", state: "NY", zipcode: 10453},
  {name: "Dr. Jeffrey Crespin", address: "800A Fifth Avenue", city: "New York", state: "NY", zipcode: 10065},
  {name: "Dr. Wayne Sebastiano", address: "78-01 Myrtle Avenue", city: "Glendale", state: "NY", zipcode: 11385},
  {name: "Dr. Nina Nguyen", address: "1181 Grand Concourse", city: "Bronx", state: "NY", zipcode: 10452}, 
  {name: "Dr. Natalya Rodionova", address: "2109 Mathews Ave", city: "Bronx", state: "NY", zipcode: 10462},
  {name: "Dr. Ronak Chinai", address: "610 Washington Blvd", city: "Jersey City", state: "NJ", zipcode: 07310},
  {name: "Dr. Leslie Miller", address: "106 Liberty Street", city: "New York", state: "NY", zipcode: 10006},
  {name: "Dr. Douglas Bailyn", address: "380 Second Ave", city: "New York", state: "NY", zipcode: 10010},
  {name: "Dr. John Coyne", address: "409 East 14th Street", city: "New York", state: "NY", zipcode: 10009}
])
