# nalin DevTinder APIs

## authRouter
- POST /signup :- creating a profile
- POST /login :- login using username, password
- POST /logout :- 

## profileRouter
- GET /profile/view :- to get the profile(profile view)
- PATCH /profile/edit :- to update the profile(edit)
- PATCH /profile/password :- to change the password of the profile

## connectionRequestRouter
//sending the connection request
- POST  /request/send/intrested/:userId
- POST /request/send/ignored/:userId
//review the connection request
- POST /request/review/accepted/:requestId
- PSOT /request/review/rejected/:reqyestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - gets you the profiles of other users on platform

Status: ignored, intrested, accepted, rejected


