# corrently4domoticz
Wrapper for Corrently Green Power Index to Domoticz

## Prerequisites
- Domoticz installed and running on same machine
- Node JS installed (> V8.0)
- Zip Code from Germany (try 69256 if you do not have).


## Installation

`npm i -g corrently4domoticz`

## Usage

Rename `sample.env`  to `.env`

Edit and change pointers to devices. Remove devices you do not want to use.

| Field Name  | Details |
|---|---|
| DOMOTICZ_JSON_URL | URL of your /json.htm - typically http://localhost:8080/json.htm |
| PLZ | Zipcode in Germany (eq. 69256) |
| IDX_current_gsi | Device Index for current GSI Index value (percentage device type) |
| IDX_green_alert | Device Index for hour with most green power (alert device type) |
| IDX_red_alert | Device Index for hour with least green power (alert device type) |
| IDX_current_alert | Device Index for current GSI (alert device type) |

Setup a cron job that runs every hour to update Domoticz.

## Inspired by:
- https://www.corrently.de/hintergrund/gruenstromindex/index.html - German Info on Green Power Index
- https://www.domoticz.com/wiki/Domoticz_API/JSON_URL%27s - Domoticz JSON Interface
