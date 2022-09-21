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
    private _discountInPercent: number
  ) {}

  public get expiresIn(): number {
    return this._expiresIn
  }

  public set expiresIn(value: number) {
    this._expiresIn = Math.max(0, value)
  }

  public get discountInPercent(): number {
    return this._discountInPercent
  }

  public set discountInPercent(value: number) {
    this._discountInPercent = Math.max(0, Math.min(50, value))
  }

  // NOTE. I don't really like this, but I din't find a better solution
  // in order to get JSON.stringify to use the getters instead of the
  // private attributes. There must be a better solution for this. I hope.
  get formatted(): any {
    return {
      partnerName: this.partnerName,
      expiresIn: this.expiresIn,
      discountInPercent: this.discountInPercent
    }
  }

  public nextDay(): void {
    this.expiresIn--    
    this.discountInPercent = this.computeDiscountRate(this.expiresIn)
  }

  protected computeDiscountRate(expiresIn: number): number {
    if (expiresIn > 0) {
      return this.discountInPercent - 1
    } else {
      return this.discountInPercent - 2
    }
  }

  
}

export class NaturaliaOffer extends DiscountOffer {
  constructor(expiresIn: number, discountRateInPercent: number) {
    super("Naturalia", expiresIn, discountRateInPercent)
  }

  protected computeDiscountRate(expiresIn: number): number {
    if (expiresIn > 0) {
      return this.discountInPercent + 1
    } else {
      return this.discountInPercent + 2
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
      return this.discountInPercent + 1
    }

    if (expiresIn > 5) {
      return this.discountInPercent + 2
    }

    if (expiresIn > 0) {
      return this.discountInPercent + 3
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
      return this.discountInPercent - 2
    } else {
      return this.discountInPercent - 4
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
