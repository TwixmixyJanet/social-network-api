const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();
console.log(cwd);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is now running at 🚀 http://localhost:${PORT} 🚀`);
    });
});