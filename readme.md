## Descibe auth middleware

[1] frontend send token

```js
const res = await axios.patch("/api/auth/updateUser", user, {
  headers: {
    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
  },
});
```

[2] catch authorization property from header

```js
const authHeader = req.headers.authorization;
```

[3] check if header is present or header must starts with `Bearer `

```js
if (!authHeader || !authHeader.startsWith("Bearer")) {
  throw new UnauthenicatedError("Authentication invalid");
}
```

[4] Grab the token

```js
const token = authHeader.split(" ")[1];
```

[5] Verify and decrypt the token and attach token to `req.user` object. Call the next middleware

```js
try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  }
```

[6] If there is an error throw error

```js
catch (err) {
    throw new UnauthenicatedError("Authentication invalid");
  }
```

### Fake Data to database

[makaroo](https://www.mockaroo.com/)
