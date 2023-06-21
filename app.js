const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
  axios.get('https://example.ru/')
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      // Найдите все заголовки на странице
      const headings = $('div');
      const titles = [];
      console.log({headings})
      
      // Получите текст каждого заголовка и добавьте его в массив titles
      headings.each((index, element) => {
        titles.push($(element).text());
      });
      
      res.send(titles);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
