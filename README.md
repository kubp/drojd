# Drojd CMS <img src="https://strider.drojd.cz/kubp/drojd/badge?branch=master">

A simple CMS written in Node.js and React.

# Installation
```shell
git clone git@github.com:kubp/drojd.git
npm install
node server/app.js 
```
or using npm
```shell
npm install drojd-cms
node server/app.js 
```


# Example
- [pt.al](https://pt.al) - my blog
- [playground.drojd.org](https://playground.drojd.org/admin.html) - administration

# Config example
```json
{
    "db":"mongodb://localhost/drojd",
    "secret":"somuchsecret",
    "jwtexpires":86400,
    "api_url":"/api",
    "url":"http://localhost"
}
```
# Production Config
```shell
NODE_ENV=production node server/app
```
 without `config.json`

```shell
NODE_ENV=production PORT=8080 SECRET=CAT API_URL=/URL node server/app
```

<br>
I would love it if you could contribute

<img src="http://cdn.drojd.org/drojdg.jpg" width="450">


