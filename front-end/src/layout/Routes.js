import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation"
import NotFound from "./NotFound";
import { today, previous, next } from "../utils/date-time";

function Routes() {

  const [date, setDate] = useState(today())

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        {/* <Redirect to={"/dashboard"} /> */}
        <NewReservation setDate={setDate} today={today}/>
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} today={today} previous={previous} next={next}/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
