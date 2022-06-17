const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = "https://www.theguardian.com/international"

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const articles = [];

        $(".js-headline-text", html).each(function() {
            const newsTitle = $(this).text();
            const newsUrl = $(this).attr('href');
            articles.push({
                newsTitle,
                newsUrl
            });
        })

        console.log(articles)

    }).catch(err => console.log(err));

app.listen(PORT.env || 8000, () => {
    console.log(`Server is live on Port: ${PORT}`);
});