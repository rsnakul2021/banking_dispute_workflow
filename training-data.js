const fetch = require('node-fetch');
const csv = require('csv-parser');
const fs = require('fs');

async function downloadData() { //downloading data from the CFPB to train model 
    const url = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/?field=complaint_what_happened&size=10000';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.hits.hits.map(hit => ({
            text: hit._source.complaint_what_happened,
            category: hit._source.product
        }));
    } catch (error) {
        console.error('Error downloading data:', error);
        return [];
    }
}
module.exports = { downloadData }; 