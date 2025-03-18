//mock database for customer data that updates based on customer ID
const CUSTOMER_DB = {
    "CUST001": { high_risk: true, previous_disputes: 5 },
    "CUST002": { high_risk: false, previous_disputes: 1 }
};

module.exports = CUSTOMER_DB; 