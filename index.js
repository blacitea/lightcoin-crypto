class Account {

  constructor(username) {
    this.username = username;
    // no money in new account, yet
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let event of this.transactions) {
      balance += event.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction { // I am a SUPER class

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();
    this.account._balance += this.value;
    this.account.addTransaction(this);
  }
}

class Withdrawal extends Transaction {

  get value() {
    return (- this.amount);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected


const myAccount = new Account("snow-patrol");
console.log(myAccount);

let t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

let t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

let t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Ending Balance:', myAccount.balance);

