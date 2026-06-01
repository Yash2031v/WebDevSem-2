public class Experiment10 {

    // Abstract class
    abstract class BankAccount {

        int accountNumber;
        String accountHolderName;
        double balance;

        // Constructor
        BankAccount(int accountNumber, String accountHolderName, double balance) {
            this.accountNumber = accountNumber;
            this.accountHolderName = accountHolderName;
            this.balance = balance;
        }

        // Deposit Method
        void deposit(double amount) {
            balance = balance + amount;
            System.out.println("Amount Deposited: " + amount);
        }

        // Display Account Details
        void displayDetails() {
            System.out.println("Account Number: " + accountNumber);
            System.out.println("Account Holder Name: " + accountHolderName);
            System.out.println("Balance: " + balance);
        }

        // Abstract Method
        abstract void calculateInterest();
    }

    // SavingsAccount class
    class SavingsAccount extends BankAccount {

        SavingsAccount(int accountNumber, String accountHolderName, double balance) {
            super(accountNumber, accountHolderName, balance);
        }

        void calculateInterest() {
            double interest = balance * 0.05; // 5% interest
            System.out.println("Savings Account Interest: " + interest);
        }
    }

    // CurrentAccount class
    class CurrentAccount extends BankAccount {

        CurrentAccount(int accountNumber, String accountHolderName, double balance) {
            super(accountNumber, accountHolderName, balance);
        }

        void calculateInterest() {
            double interest = balance * 0.02; // 2% interest
            System.out.println("Current Account Interest: " + interest);
        }
    }

} 