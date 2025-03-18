const natural = require('natural');
const tf = require('@tensorflow/tfjs');
const { downloadData } = require('./training-data');

class DisputeClassifier { //a class for the dispute classifier
    constructor() {
        this.tokenizer = new natural.WordTokenizer();
        this.classifier = null;
        this.vocab = new Set();
        this.categories = [];
        this.model = null;
    }

    async train() {
        const trainingData = await downloadData(); //download data from the training-data.js file
        trainingData.forEach(item => { //creating vocabulary and categories
            const tokens = this.tokenizer.tokenize(item.text.toLowerCase());
            tokens.forEach(token => this.vocab.add(token));
            if (!this.categories.includes(item.category)) {
                this.categories.push(item.category);
            }
        });
        const X = trainingData.map(item => this.textToVector(item.text));
        const y = trainingData.map(item => this.categories.indexOf(item.category));

        this.model = tf.sequential({ //a simple neural network model built using tensorflow.js
            layers: [
                tf.layers.dense({
                    inputShape: [this.vocab.size],
                    units: 128,
                    activation: 'relu'
                }),
                tf.layers.dropout(0.5),
                tf.layers.dense({
                    units: this.categories.length,
                    activation: 'softmax'
                })
            ]
        });

        this.model.compile({
            optimizer: 'adam',
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy']
        });
        const xsTrain = tf.tensor2d(X);
        const ysTrain = tf.tensor1d(y);
        await this.model.fit(xsTrain, ysTrain, {
            epochs: 1, //change epochs as needed
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: accuracy = ${logs.acc}`);
                }
            }
        });
        console.log('Training completed');
    }

    textToVector(text) { //converting text to vectors for the model
        const tokens = this.tokenizer.tokenize(text.toLowerCase());
        const vector = new Array(this.vocab.size).fill(0);
        tokens.forEach(token => {
            const index = Array.from(this.vocab).indexOf(token);
            if (index !== -1) {
                vector[index] = 1;
            }
        });
        return vector;
    }

    async classify(text, amount) { //classifying the text based on category maps defined below
        if (!this.model) {
            throw new Error('Model not trained yet');
        }
        const vector = this.textToVector(text);
        const prediction = await this.model.predict(tf.tensor2d([vector])).array();
        const categoryIndex = prediction[0].indexOf(Math.max(...prediction[0]));
        const category = this.categories[categoryIndex];
        const categoryMapping = { //mapping the categories to the dispute categories
            'Credit card or prepaid card': 'Billing Error',
            'Bank account or service': 'Service Issue',
            'Credit reporting, credit repair services, or other personal consumer reports': 'Fraud',
            'Money transfer, virtual currency, or money service': 'Fraud',
            'default': 'General Dispute'
        };
        return categoryMapping[category] || categoryMapping.default;
    }
}
module.exports = DisputeClassifier; 