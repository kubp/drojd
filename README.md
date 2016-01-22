# Drojd CMS
A simple CMS writtent in Node.js and React.

# Installation
```shell
git clone git@github.com:kubp/drojd.git
 ```

```shell
npm install
```

```shell
node app.js 
```

# Example
- [www.drojd.eu](https://www.drojd.eu)
- [www.drojd.eu](https://generated.drojd.eu) - generated page

# Config example
```js
dev =
{
    db:"mongodb://localhost/drojd",
    secret:"mysecret",
    jwtexpires:3600,
    mailer:{
        user: '',
        pass: ''
       }

}
production =
{
    db:"mongodb://localhost/drojd",
    secret:"mysecret",
    jwtexpires:3600,
    mailer:{
      user: '',
      pass: ''
    }
}
config = process.env.NODE_ENV === 'production' ? production : dev;
module.exports = config
```
