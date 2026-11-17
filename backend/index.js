'use strict';

const express = require('express');
const app = express();

app.use(express.json());

// define endpoint for exercise 1 here
app.get('/math/circle/:r', (req, res) => {
  const radius = parseFloat(req.params.r);
  
  if (isNaN(radius)) {
    return res.status(400).json({ error: 'Radius must be a valid number' });
  }

  const area = parseFloat(Math.PI * radius * radius).toFixed(2);
  const circumference = parseFloat(2 * Math.PI * radius).toFixed(2);

  const result = {
    area: area,
    circumference: circumference
  };
  res.json(result);
});

//TODO2


//TODO3


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});