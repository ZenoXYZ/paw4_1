'use strict';

const express = require('express');
const app = express();

app.use(express.json());

// Endpoint for circle
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

// Endpoint for rectangle
app.get('/math/rectangle/:width/:height', (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);
  
  if (isNaN(width) && isNaN(height)) {
    return res.status(400).json({ error: 'Width and height must be a valid number' });
  }
  
  if (isNaN(width)) {
    return res.status(400).json({ error: 'Width must be a valid number' });
  }
  
  if (isNaN(height)) {
    return res.status(400).json({ error: 'Height must be a valid number' });
  }

  const area = width * height;
  const perimeter = 2 * width + 2 * height;

  const result = {
    area: area,
    perimeter: perimeter
  };
  res.json(result);
});

// Endpoint for power
app.get("/math/power/:base?/:exponent?", (req, res) => {
  const base = req.params.base !== undefined ? parseFloat(req.params.base) : 4;
  const exponent = req.params.exponent !== undefined ? parseFloat(req.params.exponent) : 2;

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ 
      error: "Base and exponent must be valid numbers." 
    });
  }

  const isRoot = req.query.root === 'true';

  if (isRoot && base < 0) {
    return res.status(400).json({ 
      error: "Base cannot be negative with root=true." 
    });
  }

  const power = Math.pow(base, exponent);

  if (isRoot) {
    const root = Math.sqrt(base);
    res.json({
      result: power,
      root: root
    });
  } 
  else {
    res.json({
      result: power
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});