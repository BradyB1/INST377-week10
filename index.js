const express = require('express')
var bodyParser = require('body-parser');
const supabaseClient = require("@supabase/supabase-js")
const { error } = require('console');
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://hyxdhdfvxlqxmabpncfp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5eGRoZGZ2eGxxeG1hYnBuY2ZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTE5MTQwNiwiZXhwIjoyMDE2NzY3NDA2fQ.PDez7IymWzcA6GR9nR9aBgndQACKsN7dp9sqGBBNE38'

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/INST377-Week10-PPT.html', { root: __dirname })
})

app.get('/customers', async (req, res) => {
  console.log('Getting Customer')

  const { data, error } = await supabase
    .from('Customer')
    .select();

  if (error) {
    console.log(error)
  } else if (data) {
    res.send(data)
  }
})


app.post('/customers', async (req, res) => {
  console.log('Received POST request to /customers');
  console.log('Adding Customer')

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var state = req.body.state;

  const { data, error } = await supabase
    .from('Customer')
    .insert([
      { 'cust_first_name': firstName, 'cust_last_name': lastName, 'cust_state': state }
    ])
    .select();

  console.log(data)
  res.header('Content-type', 'application/json')
  res.send(data)
})


app.listen(port, () => {
  console.log('APP IS ALIVEEEEE')
})