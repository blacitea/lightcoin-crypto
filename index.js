class Account {

  constructor(username) {
    this.username = username;
    // no money in new account, yet
    this._transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this._transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this._transactions.push(transaction);
  }

  get transaction() {
    for (let t of this._transactions) {
      console.log(t.constructor.name, t.amount, t.time);
    }
    return this._transactions;
  }
}

class Transaction { // I am a SUPER class

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      console.log("Unsufficient Fund. Transaction cannot proceed.");
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
  isAllowed() {
    return (this.account.balance + this.value) >= 0 ? true : false;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Angel");

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount._transactions);

myAccount.transaction;


// const myAccount = new Account("snow-patrol");
// console.log("Opening account:", myAccount);
// console.log("Opening account:", myAccount.balance);

// let t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
// // console.log('Transaction 1:', t1);

// let t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
// //console.log('Transaction 2:', t2);

// let t3 = new Deposit(120.00, myAccount);
// t3.commit();
// //console.log('Transaction 3:', t3);

// let t4 = new Withdrawal(18, myAccount);
// t4.commit();

// console.log('Ending Balance:', myAccount.balance);
// console.log(myAccount.transactions);

