const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DisputeClassifier = require('./DisputeClassifier');
const PriorityAssigner = require('./PriorityAssigner');
const path = require('path');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const disputeClassifier = new DisputeClassifier(); //creating neccessary objects
const priorityAssigner = new PriorityAssigner();

async function initializeClassifier() { //training classifier modelled in DisputeClassifier.js
    console.log('Training classifier');
    await disputeClassifier.train();
    console.log('Classifier training completed');
}

initializeClassifier().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`); //starting server at 3000
    });
});

app.post('/api/dispute', async (req, res) => {
    try {
        const { customer_id, reason, amount, datetime, transaction_id } = req.body;

        if (!customer_id || !reason || !amount || !datetime) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const dispute_type = await disputeClassifier.classify(reason, amount);
        const priority = priorityAssigner.assignPriority(customer_id, dispute_type, amount);

        const response = {
            dispute_id: transaction_id,
            category: dispute_type,
            priority: priority,
            recommended_action: priority === "High" ? "Investigate immediately" : "Resolve within 48 hours",
            timestamp: new Date(datetime).toISOString(),
            assigned_team: dispute_type === "Fraud" ? "Fraud Team" : "General Support"
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); //adding get and simple UI defined in the public folder
}); 