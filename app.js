// Подключаем модули 
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));

// роуты для обработки запросов с фронта
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(_dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

// Получаем порт из конфига
const PORT = config.get('port') || 5000;

// Подключение сервера к базе данных
mongoose
  .connect(config.get('mongoUri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`app has bin started on port ${PORT}...`));
  })
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });