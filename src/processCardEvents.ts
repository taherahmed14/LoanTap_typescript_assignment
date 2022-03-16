import { CardEvent, Transaction } from './types'

type CardTransactionMapping = {
  [cardId: string]: Transaction
}

/**
 * Write a function that receives a large batch of card events from multiple cards,
 * returning an object which maps from cardId -> valid transaction. Only cardIds with
 * a valid transaction should appear in the returned object.
 *
 * A valid transaction is a pair of card events, starting with a RESERVATION event
 * and finishing with either a CONFIRMATION or CANCELLATION event.
 *
 * The input is an array of unprocessed card events. Some events might be duplicated
 * or missing. For duplicated events, you may only use one of its occurrences and
 * discard the rest. Missing events invalidate the transaction.
 *
 * @param cardEvents CardEvent[] List of card events
 * @returns CardTransactionMapping Valid transactions grouped by cardId
 */
export const processCardEvents = (cardEvents: CardEvent[]): CardTransactionMapping => {

  // logic
  let res:any = {};
  for(let cards of cardEvents) {
      if(res[cards.cardId]) {
          if(cards.type === 'CONFIRMATION' || cards.type === 'CANCELLATION') {
              if(res[cards.cardId].length < 2)
                  res[cards.cardId] = [...res[cards.cardId], cards];
          }
      }
      else {
          res[cards.cardId] = [cards];
      }
  }

  let ans:any = {};
  for(let key in res) {
    console.log(res[key]);
    
    if(res[key].length === 2) {
        ans[key] = res[key];
    }
  }
  // console.log(ans);

  return ans as CardTransactionMapping
}
