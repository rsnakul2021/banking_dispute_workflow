# Banking dispute workflow and API integration
A RestAPI that takes banking disputes from users and classifies them based on the risk. The disputes are further forwarded to the necessary teams within to ensure smoot handling of disputes. 

# Summary
Workflow and API Integration of a user bank dispute classifier. Tech stack - Python, Node.js, HTML and CSS. User fills up dispute form and a learning model classifies the input based on its knowledge base. Makes use of Tensorflow for classifcaition and NLP to understand user data.

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

# Approach:
My approach to building the workflow:

Essentially customers submit transaction disputes through a web interface. The system captures essential details (customer ID, amount, reason, timestamp) via a RESTful. Upon submission, the data flows through an ML-based classifier (built with TensorFlow.js and trained on CFPB data) that categorizes the dispute into types like "Fraud," "Billing Error," or "Service Issue." The classifier analyzes the dispute text using natural language processing, while the priority assignment module evaluates customer history and dispute type to determine urgency. The API then returns a comprehensive response including dispute category, priority level, recommended actions, and team assignments, which is displayed to the user in real-time through the interface.

With increased cases of bank frauds globally, the prototype can use AI-Assistance for providing users urgent-care based on the disput level. Assistance for next-steps for the users based on compliance and law. Assistance for a chatbot to interact with disputed users. AI can also optimize the code can incorporate other data sources to improve classification. Provide resources to users to help curb bank traffic.
