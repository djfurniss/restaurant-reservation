import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import EditReservation from "../reservations/EditReservation";
import NewTable from "../tables/NewTable";
import Seating from "../seating/Seating";
import Search from "../search/Search";
import NotFound from "./NotFound";
import { today, previous, next } from "../utils/date-time";

function Routes() {

  const [date, setDate] = useState(today())

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
          date={date} 
          setDate={setDate} 
          today={today} 
          previous={previous} 
          next={next}/>
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seating/>
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
       <EditReservation setDate={setDate} today={today}/>
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation setDate={setDate} today={today}/>
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route exact={true} path="/search">
        <Search/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
