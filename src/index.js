import "./styles/style.css";
import random from 'lodash/random'
import _ from 'lodash'

console.log('hi webpack')
console.log(random(0,10))
console.log(random(0,100))
console.log(_.partition([1, 2, 3, 4], n => n % 2))
