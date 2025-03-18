# ZetaAssn_Q1
Zeta Assignment Question 1

# Summary
Workflow and API Integration of a user bank dispute classifier. Tech stack - Python, Node.js, HTML and CSS. User fills up dispute form and a learning model classifies the input based on its knowledge base. 

Dataset source - https://www.consumerfinance.gov/data-research

-- Note: The model runs for 1 epoch and early stops (this is done to reduce run time since its a prototype)

# Explanation to the different Node.js files in the folder and their functionality:

•	AIClassifier.js – Sets up server, run configurations, requests from local host. Essentially the main file to run as it creates objects of the other 2 files within it.

•	DisputeClassifier.js – The AI/ML logic to classifying disputes based on a learning model.

•	Training-data.js – A file used to retrieve data from the mentioned source.

•	PriorityAssigner.js – Redirecting and labelling disputes.

•	mockDB.js – The low-code database to store intermediate data.

•	Index.html – A simple UI to accept user inputs.

•	Styles.css – A css file adding décor to the UI

# How to run?
 -- 1) Clone repo with git clone and cd into directory

 -- 2) Create folder if it doesnt already exist
 
mkdir dispute-handler

cd dispute-handler

-- 3) Initialize node project with npm init -y

-- 4) Install dependencies as given in the .txt file or run

npm install express body-parser cors natural @tensorflow/tfjs node-fetch@2 csv-parser

-- 5) Start the server/ run file with node AIClassifier.js

-- 6) Open local host `http://localhost:3000` in a browser
