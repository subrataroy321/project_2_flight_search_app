require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION;
const rapidapi_key = process.env.rapidapi_key;
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const axios = require('axios');



