import { Store, DiscountOffer, NaturaliaOffer, IlekOffer, VintedOffer } from "./store";

describe("Generic Discount Offer", () => {
  it("should decrease the discount by 1 point each day, while the offer has not expired", () => {
    expect(new Store([new DiscountOffer("Generic", 2, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Generic", 1, 2)]
    );
  });

  it("should decrease the discount percentage by 2 points each day since the offer has expired", () => {
    expect(new Store([new DiscountOffer("Generic", 0, 2)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Generic", 0, 0)]
    );
  });

  it("should not decrease the expiresIn nor discountRateInPercent attributes to negative values", () => {
    expect(new Store([new DiscountOffer("Generic", 0, 0)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Generic", 0, 0)]
    );
  });
});

describe("Naturalia Discount Offer", () => {
  it("should increment the rate by 1 point while the offer has not expired", () => {
    expect(new Store([new NaturaliaOffer(2, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Naturalia", 1, 4)]
    );
  });

  it("should increment the rate by 2 points since the offer has expired", () => {
    expect(new Store([new NaturaliaOffer(0, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Naturalia", 0, 5)]
    );
  });

  it("should never increase the rate over 50", () => {
    expect(new Store([new NaturaliaOffer(2, 50)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Naturalia", 1, 50)]
    );
  })
})

describe("Ilek Discount Offer", () => {
  it("Should never expire nor decrement", () => {
    expect(new Store([new IlekOffer(2, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Ilek", 2, 3)]
    );
  });
})

describe("Vinted Discount Offer", () => {
  it("should increment the rate by 1 point while the offer has more than 10 days left", () => {
    expect(new Store([new VintedOffer(15, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 14, 4)]
    );
  });

  it("should increment the rate by 2 points while the offer has less than 10 days left", () => {
    expect(new Store([new VintedOffer(10, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 9, 5)]
    );
  });

  it("should increment the rate by 3 points while the offer has less than 5 days left", () => {
    expect(new Store([new VintedOffer(5, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 4, 6)]
    );
  });

  it("should drop the rate 0 when the offer has expired", () => {
    expect(new Store([new VintedOffer(0, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 0, 0)]
    );
  });

  it("should never increase the rate over 50", () => {
    expect(new Store([new VintedOffer(5, 49)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 4, 50)]
    );
  })
})

describe("Backmarket Discount Offer", () => {
  it("should decrease the discount by 2 points each day, while the offer has not expired", () => {
    expect(new Store([new DiscountOffer("Backmarket", 2, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Backmarket", 1, 2)]
    );
  });

  it("should decrease the discount percentage by 4 points each day since the offer has expired", () => {
    expect(new Store([new DiscountOffer("Backmarket", 0, 2)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Backmarket", 0, 0)]
    );
  });

  it("should not decrease the expiresIn nor discountRateInPercent attributes to negative values", () => {
    expect(new Store([new DiscountOffer("Backmarket", 0, 0)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Backmarket", 0, 0)]
    );
  });
})