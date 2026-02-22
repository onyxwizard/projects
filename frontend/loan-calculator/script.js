function calculateLoan() {
    const loanAmount = document.getElementById("loanamount").value;
    const interestRate = document.getElementById("interest-rate").value;
    const monthToPay = document.getElementById("monthtopay").value;

    // Convert annual interest rate to a monthly rate in decimal form
    const monthlyInterestRate = (interestRate / 100) / 12;

    // Use the standard EMI formula for compound interest
    // EMI = P x R x (1+R)^N / [(1+R)^N-1]
    // where P = Principal, R = Monthly Interest Rate, N = Tenure in months
    if (monthlyInterestRate > 0) {
        const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthToPay)) / (Math.pow(1 + monthlyInterestRate, monthToPay) - 1);
        document.getElementById("month-amount").innerHTML = `Monthly Payment (EMI): ₹${emi.toFixed(2)}`;
    } else {
        // Handle case with 0% interest rate
        const emi = loanAmount / monthToPay;
        document.getElementById("month-amount").innerHTML = `Monthly Payment (EMI): ₹${emi.toFixed(2)}`;
    }
}
