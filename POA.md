1) Finish the socket handlers for draw, attack, discard(includeing player health)
2) Work on board and card styles to be better(no hover cards in hand or more visibility to cards in hand maybe add)


State updates in the modal is a little wonky everything need to be based on the card 
we get from the hook in the modal not thecard state of the modal



### Ideas for Fire base Real Time Data Base:
- all data stays in rtdb until winner is determined and then wrapp it all up and push to firestore 

#### duelist/playerId/{gameId}:

- stores the duelist info: deck,hp,userName
- max of three 

#### duel/gameId:

- game state(Ref Game Context)

#### board/gameId
- make changes to the board state so that it only has to be one that the ui picks up