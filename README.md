# Final Capstone: Restaurant Reservation System

>This project was my final capstone for my software engineering bootcamp.

This web app is used only by restaurant personnel when a customer calls to request a reservation. Restaurant staff can create tables, seat, cancel, or edit reservations, and search for them via phone. For now, the web app is not accessible to customers. 

## Mobile First Development
The site is built on breakboints from mobile sized screens and bigger, breaking into desktop at 768 pixels wide.


## Dashboard
The dashboard is where all of the color coded reservations for the day can be found. Look at the previous day, next day, or quickly find your way back to the present by using the "today" button. Don't feel like clicking through the buttons to get to two weeks ago? - Manually change the date in the URL for a fast arrival at a specific date. Underneath are all of the restaurant's tables including their capacities and statuses.
![app from mobile view](/readme-imgs/mobile-first.png)
![app from desktop view](/readme-imgs/desktop.png)
To get the reservation's information, click on it and a modal will appear! 
![reservation modal view](/readme-imgs/res-modal.png)
No finished or cancelled reservations will appear on the dashboard but they will appear in the search.


## Search
*ring ring* a customer calls and needs to edit the information on their reservation (more on that later).

The great thing about searching for a reservation is that you don't need the entire phone number. Simply type 555 and you'll find 555-908-4873. A quick and easy look up to find the reservations you need.
![search page](/readme-imgs/search-page.png)

## New Reservation
A reused component renders the form for a new reservation. Validation is put in place on the client side as well as server side. Input type attributes are used to get the default layout like seen with reservation date and time.
![new reservation form with the date focused](/readme-imgs/new-res-date.png)
![new reservation form with time focused](/readme-imgs/new-res-time.png)


## New Table
A simple form that allows restaurant management to enter all of their tables in the restaurant or add a new one if they just upgraded.

## Seating a reservation
On a booked reservation, when it's their time to be seated, it's as easy as clicking "seat". No really! Then all you have to do is assign them a table (no worries, occupied tables don't render and tables that can't hold the party size will result in a user friendly error message).
![seating page](/readme-imgs/seat.png)


## Editting a reservation
This page uses the same component that New Reservation does and has the same validation. Once submitted, you're directed back to the dashboard loading in on the date of the reservation you just editted.
![editting page](/readme-imgs/edit.png)
