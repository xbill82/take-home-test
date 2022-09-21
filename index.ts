import { Store, DiscountOffer, NaturaliaOffer, VintedOffer, IlekOffer } from "./store";

import fs from "fs";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new NaturaliaOffer(10, 5),
  new VintedOffer(5, 40),
  new IlekOffer(15, 40)
];
const store = new Store(discountOffers);

let log = ''

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log = log.concat(JSON.stringify(
    store.updateDiscounts().map(offer => offer.formatted)
  ), elapsedDays < 29 ? ',' : '')
}

/* eslint-disable no-console */
fs.writeFile("output.txt", log, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
