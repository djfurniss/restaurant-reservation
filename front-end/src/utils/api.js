/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel){
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
};

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal){
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
};

export async function createReservation(newReservation, signal){
  const url = new URL(`${API_BASE_URL}/reservations`);
  // the api will not except the string version of the people property so it needs to be turned into a number first
  newReservation.people = Number(newReservation.people);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: newReservation }),
    signal,
   };

  return await fetchJson(url, options, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
};

export async function readReservation(reservation_id, signal){
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);

  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
};

export async function updateReservation(updatedInfo, reservation_id, signal){
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  
  await formatReservationDate(updatedInfo);
  await formatReservationTime(updatedInfo);

  updatedInfo.people = Number(updatedInfo.people);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: updatedInfo }),
    signal,
  };

  return await fetchJson(url, options, [])
  .then(formatReservationDate)
  .then(formatReservationTime);
};

export async function updateStatus(reservation_id, status, signal){
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/status`);

  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: {status} }),
    signal,
  };

  return await fetchJson(url, options, [])
};

export async function findReservationByNumber(mobile_number, signal){
  const url = new URL(`${API_BASE_URL}/reservations/?mobile_number=${mobile_number}`);

  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
};

export async function listTables(signal){
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, [])
};

export async function createTable(newTable, signal){
  const url = new URL(`${API_BASE_URL}/tables`);
  // the api will not except the string version of capacity so it needs to be turned into a number first
  newTable.capacity = Number(newTable.capacity)
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: newTable }),
    signal,
   };

  return await fetchJson(url, options, [])
};

export async function seat(reservation_id, table_id, signal){
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);

  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: {reservation_id} }),
    signal,
   };

  return await fetchJson(url, options, [])
};

export async function finishTable(table_id, signal){
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);

  const options = {
    method: "DELETE",
    headers,
    signal,
   };

   return await fetchJson(url, options, [])
};