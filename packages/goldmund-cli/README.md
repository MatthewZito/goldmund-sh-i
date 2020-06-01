# Goldmund.io Admin CLI
```
Author: Matthew T Zito (goldmund)
License: MIT
Interpreter: Node 13.6.0
Encoding: UTF-8
```
## Table of Contents

 - [Introduction](#intro) 
    * [About](#about)
    * [Demos](#demo)
 - [Installation](#install) 
 - [Usage](#usage) 
 - [Development Notes](#notes)

## <a name="intro"></a> Introduction
The Admin CLI is a console-oriented service for local web administration and sessions-handling. It can be best understood as a light-weight, headless CMS.

### <a name="about"></a> About
The CLI enables the controller to authenticate with the issuing authority (in this instance, the DPS API); the resulting auth token is persisted in a local session file. Destroying this session via `goldmund deauth` will simultaneously nullify the session on both the issuing authority database and local session file. While the local session is valid, it will be included in the headers of all subsequent `goldmund push` calls. However, if the session is null (either does not exist or is expired), the CLI will prompt the controller to authorize.

The CLI hosts a static entry template (`ephemera.json`) which is populated either via `goldmund pull --slug <slug>` or by way of controller inputs. The former scenario involves an entry ID - a string which identifies existing entries in the database. If this ID is present (it will be if the entry was pulled from the database), the CLI programatically determines the operation type is an update, ergo `goldmund push` will call a `PATCH` request and submit the entry to its corresponding ID-contingent endpoint. 

In the latter scenario, the CLI determines the template signifies a new entry given the lack of an entry ID field. Thus, calling `goldmund push` will call a `POST` request with the new entry data. The newly-minted slug corresponding to the new entry will be returned to the CLI upon successful resource creation.

It should also be noted that calling `goldmund deauth` will reset the entry template, wiping *all* values, as well as the ID key/value pair (if extant).

## <a name="install"></a> Installation
First, establish `.env` variables as needed.
```
npm install
npm link
```

## <a name="usage"></a> Usage

Authorize a new session:
```
goldmund auth
```

Populate local tempfile with a given entry qua slug
```
goldmund pull --slug <String: slug>
```

Push local tempfile to API
```
goldmund push
```

Destroy session/clean-up:
```
goldmund deauth
```


#### <a name="notes"></a> Development Notes
Soon, the CLI will be launched on a server and utilized as a wholly remote console-oriented service via web sockets.