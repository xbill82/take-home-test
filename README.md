# Greenly Take-Home Test Specification

## Refactoring: why and how
In order to implement the required feature, I noticed a few flaws in the code that did require refactoring:
* all the logic that computes the new rates for all the partners was encapsulated in one big function, which breaks the [open/closed principle](https://www.freecodecamp.org/news/open-closed-principle/) (i.e. developers are forced to modify the existing logic in order to add new logic);
* the logics of the different partners were all tangled together in a nest of `if`, which was so difficult to read I basically gave up understanding it.

Adding the Backmarket offer to this mess was not only too difficult, but definitely the wrong thing to do.

The refactoring introduced a class hierarchy where a generic `DiscountOffer` is extended and overloaded by child classes, implementing specific logic for specific partners (like Ilek, Naturalia and the Backmarket offer itself). This way, each time a new offer is added, the existing ones don't need to be modified (following the open/closed principle). Plus, the logic for each partner/offer is now easy to read and reason about. If a partner requires a change to their discount offer, it is now way easier to reason about each single partner's logic.

## Other changes

* The whole codebase has been ported to Typescript;
* The whole logic is now tested;
* The `DiscountOffer` class now prevents `expiresIn` to be negative;
* The `DiscountOffer` class now prevents `discountInPercent` to be over 50 or negative;

## A note on getters and setters
In order to elegantly set limits on the `expiresIn` and `discountInPercent` attributes of the `DiscountOffer` class, I used Typescript getters and setters, which implied the introduction of private members (whose name is prepended by a `_`), holding the value manipulated by the getters and setters.
This technically isn't a breaking change, since from a Typescript point of view, the API of the class hasn't changed. But this does change the result of `JSON.stringify`, which is used in the `index.ts` file to generate the log. In fact, `JSON.stringify` doesn't take the getters into account and only includes the private members in the resulting string, which holds to a different log, since the reported members are now prepended with an underscore.
So the question is: should we consider JSON-stringifying a Typescript class part of its own API? My opinion is, no. JSON-stringifying objects is right for POJOs, not complex classes. This is the reason why I provided the `DiscountOffer` class with a `formatted` getter, returning a JSON.stringify-friendly POJO. This getter is very ugly, since it must be kept in sync with the structure of the class (and developers must remember to stringify this instead of the instance of the class), and this is a burden, but I didn't find a better solution.