const CUSTOMER_DB = require('./mockDb');

class PriorityAssigner {
    assignPriority(customer_id, dispute_type, amount) {
        const customer = CUSTOMER_DB[customer_id] || { high_risk: false, previous_disputes: 0 };
        
        if (customer.high_risk || dispute_type === "Fraud") {
            return "High";
        } else if (parseFloat(amount) > 5000 || customer.previous_disputes > 3) {
            return "High";
        }
        return "Low";
    }
}

module.exports = PriorityAssigner; 