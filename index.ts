import { Store, DiscountOffer } from "./store";

import fs from "fs";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new DiscountOffer("Naturalia", 10, 5),
  new DiscountOffer("Vinted", 5, 40),
  new DiscountOffer("Ilek", 15, 40)
];
const store = new Store(discountOffers);

const log: DiscountOffer[][] = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(store.updateDiscounts());
}

/* eslint-disable no-console */
// TODO trim the first and last bracket in order to properly match the output source of truth
fs.writeFile("output.txt", JSON.stringify(log), err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
