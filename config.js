dev =
{
    db:"mongodb://localhost/drojd",
    secret:"f1749991244c2106cdfe6b85ddf3582e915edb553a1af7d",
    jwtexpires:3600

}

production =
{
    db:"mongodb://localhost/kktech2",
    secret:"f1749991244c2106cdfe6b85ddf3582e915edb553a1af7d",
    jwtexpires:3600

}


config = process.env.NODE_ENV === 'production' ? production : dev;

module.exports = config