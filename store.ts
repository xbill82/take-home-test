import exp from "constants"

export class DiscountOffer {
  constructor(
    /**
     * The name of the partner promoting the products.
     */
    public partnerName: string,
    /**
     * The number of days before the offer expires.
     */ 
    private _expiresIn: number, 
    /**
     * The percentage of discount the partner applies to their products.
     * This value is subject to be mutated each day, following the discount rules.
     */
    private _discountRateInPercent: number
  ) {}

  public get expiresIn(): number {
    return this._expiresIn
  }

  public set expiresIn(value: number) {
    this._expiresIn = Math.max(0, value)
  }

  public get discountRateInPercent(): number {
    return this._discountRateInPercent
  }

  public set discountRateInPercent(value: number) {
    this._discountRateInPercent = Math.max(0, Math.min(50, value))
  }

  public nextDay(): void {
    this.expiresIn--    
    this.discountRateInPercent = this.computeDiscountRate(this.expiresIn)
  }

  protected computeDiscountRate(expiresIn: number): number {
    if (expiresIn > 0) {
      return this.discountRateInPercent - 1
    } else {
      return this.discountRateInPercent - 2
    }
  }
}

export class NaturaliaOffer extends DiscountOffer {
  constructor(expiresIn: number, discountRateInPercent: number) {
    super("Naturalia", expiresIn, discountRateInPercent)
  }

  protected computeDiscountRate(expiresIn: number): number {
    if (expiresIn > 0) {
      return this.discountRateInPercent + 1
    } else {
      return this.discountRateInPercent + 2
    }
  }
}

export class IlekOffer extends DiscountOffer {
  constructor(expiresIn: number, discountRateInPercent: number) {
    super("Ilek", expiresIn, discountRateInPercent)
  }
  
  public nextDay(): void {
    return
  }
}

export class VintedOffer extends DiscountOffer {
  constructor(expiresIn: number, discountRateInPercent: number) {
    super("Vinted", expiresIn, discountRateInPercent)
  }

  protected computeDiscountRate(expiresIn: number): number {
    if (expiresIn > 10) {
      return this.discountRateInPercent + 1
    }

    if (expiresIn > 5) {
      return this.discountRateInPercent + 2
    }

    if (expiresIn > 0) {
      return this.discountRateInPercent + 3
    }

    return 0
  }
}

export class BackmarketOffer extends DiscountOffer {
  constructor(expiresIn: number, discountRateInPercent: number) {
    super("Backmarket", expiresIn, discountRateInPercent)
  }

  protected computeDiscountRate(expiresIn: number): number {
    if (expiresIn > 0) {
      return this.discountRateInPercent - 2
    } else {
      return this.discountRateInPercent - 4
    }
  }
}

export class Store {
  constructor(public discountOffers: DiscountOffer[] = []) {}
  
  updateDiscounts() {
    for (var i = 0; i < this.discountOffers.length; i++) {
      this.discountOffers[i].nextDay()
    }

    return this.discountOffers;
  }
}
