
function simulateSavings({ value, rate }, years = 5) {
    const yearly = [];
    let amount = value;
    for (let i = 0; i <= years; i++) {
      yearly.push(amount.toFixed(2));
      amount += amount * (rate / 100);
    }
    return yearly;
  }
  