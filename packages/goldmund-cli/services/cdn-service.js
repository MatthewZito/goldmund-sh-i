#!/usr/bin/env node
const express = require("express");
const chokidar = require("chokidar");
const chalk = require("chalk");
const cloudinary = require("cloudinary");

/* Configurations and Constants */
const { cloudinaryName, cloudinaryKey, cloudinarySecret, cloudinaryDir } = require("../config/config.js");
let app = express();

const transformationOptions = "gldmnd_msnry_algo"
const tagOptions = ["goldmund_masonry_images"]
const destfolder = "goldmund_assets/goldmund_masonry_images"

const aggregatedOptionsObject = {
    sign_url: true,
    folder: destfolder,
    use_filename: true,
    tags: tagOptions,
    transformation: transformationOptions
}

cloudinary.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryKey,
    api_secret: cloudinarySecret,
});

// Critical: Prevents watcher from uploading existing files
let scanComplete = false;
// Instantiate watcher object
let watcher = chokidar.watch(cloudinaryDir, {
    ignored: /[\/\\]\./, persistent: true
});

/* Event Listeners */
watcher
    .on("add", (path) => {
        if (scanComplete) {
            let pathArray = path.split("/");
            if (!pathArray[pathArray.length - 1].includes("DS_STORE")) {
                console.log(chalk.green(`[+] File ${path} has been incorporated.`));
                cloudinary.v2.uploader.upload(path, aggregatedOptionsObject, (error, result) => {
                        if (error) {
                            console.log(chalk.red(`[-] An error ocurred; see: ${error}\n`));
                        }
                        else {
                            console.log(chalk.cyan(`[+] Results\nSecure URL: ${result.secure_url}\nInsecure URL: ${result.url}\n`));
                        }
                    });
                }
            }
        })

    .on("addDir", (path) => {
        // console.log("Directory", path, "has been added"); 
    })

    .on("error", (error) => { 
        console.log(chalk.red(`[-] An error ocurred; see: ${error}\n`)); 
    })

    .on("ready", () => {
        console.log(chalk.green(`[+] Initial scan complete. Now monitoring ${cloudinaryDir} for changes...\n`));
        // Chokidar has parsed all existing files, initialize watcher
        scanComplete = true;
    })

    .on("raw", (event, path, details) => {
        // console.log("Raw event info:", event, path, details);
    })


let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(chalk.green(`[+] CDN service listening on ${port}...\n`));
    console.log(chalk.yellow(`[+] Beginning initial scan; please wait...\n`))
    });

