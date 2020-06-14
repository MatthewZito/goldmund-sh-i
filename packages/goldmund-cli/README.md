# Goldmund.sh Admin CLI
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

## <a name="intro"></a> Introduction
The `goldmund-cli` package is a CLI for local web administration and sessions-handling. It can be best understood as a light-weight, headless CMS.

### <a name="about"></a> About
The CLI enables the controller to authenticate with the issuing authority (in this instance, the `goldmund-api` service); the resulting auth token is persisted in a local session file. Destroying this session via `goldmund deauth` will simultaneously nullify the session on both the issuing authority database and local session file. While the local session is valid, it will be included in the headers of all subsequent `goldmund push` calls. However, if the session is null (it either does not exist or is expired), the CLI will prompt the controller to authorize.

The CLI hosts a static local entry template (`ephemera.json`) which is populated either via `goldmund pull --slug <slug>` or by way of controller inputs. The former scenario involves an entry ID - a string which identifies existing entries in the database. If this ID is present (it will be if the entry was pulled from the database), the CLI programatically determines the operation type is an update, ergo `goldmund push` will call a `PATCH` request and submit the entry data to its corresponding ID-contingent endpoint. 

In the latter scenario, the CLI determines the template signifies a new entry given the lack of an entry ID field. Thus, calling `goldmund push` will call a `POST` request with the new entry data. The newly-minted slug corresponding to the new entry will be returned to the CLI upon successful resource creation.

It should also be noted that calling `goldmund deauth` will reset the local entry template, wiping *all* values, as well as the ID key/value pair (if extant).

To arbitrarily reset the local entry template, one need only execute the command `goldmund flush`, and the file will be restored to default settings.

For creating new entries, the `goldmund touch` command is particularly useful; it will spawn a child process in a new tab running the user's preferred text editor. The default editor has been set to vi; the editor mounts a tabula rasa template.

## <a name="install"></a> Installation
First, establish `.env` variables as needed. Then,
```
npm install
npm link
```

To enable auto-completion, generate a bash completion script with `goldmund completion` and redirect stdout into your bash profile, a la:
```
goldmund completion >> ~/.bashrc # linux
goldmund completion >> ~/.bash_profile #osx
```

## <a name="usage"></a> Usage

Authorize a new session:
```
goldmund auth
```

Populate local entry template with a given entry qua slug
```
goldmund pull --slug <String: slug>
```

Spawn new entry template in separate editor window:
```
goldmund touch
```
Stream markdown template into new entry template, spawn in separate editor window:
```
goldmund touch --stream
```

Push local entry template to API
```
goldmund push
```

Reset local entry template:
```
goldmund flush
```

Destroy session/clean-up:
```
goldmund deauth
```
