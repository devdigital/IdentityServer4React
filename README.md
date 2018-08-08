# IdentityServer4React

Example of Identity Server 4 UI built with React.

## Quick Start

1. Build the Identity Server 4 React UI in `Server/UI` with `yarn` and then `yarn build`
2. Launch Identity Server 4 from `Server/IdentityServer4React.sln` (runs at `http://localhost:5000`)
3. Launch the example client at `Client` with `yarn` and then `yarn start` (runs at `http://localhost:8080`)
4. Navigate to `http://localhost:8080` and select 'Sign In'
5. Enter a username of `bob` or `alice` and password of `password`

## Tech Stack

- Identity Server
    - [React](https://reactjs.org/)
    - [Redux](https://redux.js.org/)
    - [Redux Actions](https://github.com/redux-utilities/redux-actions)
    - [Redux Pack](https://github.com/lelandrichardson/redux-pack)
    - [Webpack 4](https://webpack.js.org/)
    - [Immutable](https://facebook.github.io/immutable-js/)
    - [Redux Form](https://redux-form.com/7.3.0/)
    - [React Router 4](https://reacttraining.com/react-router/)    
    - [Axios](https://github.com/axios/axios)
- Example Client
    - [React](https://reactjs.org/)
    - [Redux](https://redux.js.org/)
    - [Redux Actions](https://github.com/redux-utilities/redux-actions)
    - [Redux Pack](https://github.com/lelandrichardson/redux-pack)
    - [Webpack 4](https://webpack.js.org/)
    - [Redux OIDC](https://github.com/maxmantz/redux-oidc)
    - [Immutable](https://facebook.github.io/immutable-js/)
    - [Router 5](http://router5.github.io/)

## Getting Started

The Identity Server 4 server screens are within the `Server\UI` folder.
To build the UI, you need to run the following:

```bash
cd Server\UI
yarn
yarn build
```

> Note you can also use `yarn build:dev` if you want to perform a development webpack build, or `npm` as an alternative to `yarn`.

The server UI includes the necessary screens for Identity Server:

- `/account/login` -> authentication/SignIn.jsx
- `/account/logout` -> authentication/SignOut.jsx
- `/home/error` -> error/Error.jsx

> Note that this example does not currently use the consent screen.

The `build` script will output the `index.html` and webpack bundle to the `Server\IdentityServer4React\wwwroot` folder. 
You may wish to use other approaches for webpack development with .NET Core such as webpack dev middleware.

Once the UI is built, you can launch `Server\IdentityServer4React.sln` which runs at `http://localhost:5000`.

There is one example client configured with id `react-client` which uses the implicit flow, and does not require consent.

You can launch the example client:

```bash
cd Client
yarn
yarn start
```

The client runs at `http://localhost:8080`. If you navigate to there, you can select 'Sign In' which redirects you to Identity Server.
The Identity Server React UI should then be displayed with an unstyled login screen (`authentication/SignIn.jsx`). 

If you enter a valid user, you will be redirected back to the example client where the token details will be displayed.

Valid users are `bob/password` and `alice/password`.

## Areas of Interest

TODO

## Adding Custom Claims to Identity Server Cookie

To add additional claims, use the `claims` parameter of the `SignInAsync` method during authentication:

```csharp
await this.HttpContext.SignInAsync(
    subject: user.SubjectId,
    name: user.Username,
    properties: props,
    claims: new[] { new Claim("myclaim", "value") });
```

## Custom Principal Validation or Custom Cookies

If you wish to perform logic when the Identity Server cookie is created or validated, for example adding an additional cookie that sits alongside the Identity Server cookie, you can follow the advice on the [Identity Server documentation](http://docs.identityserver.io/en/release/topics/signin.html).

First, you need to specify cookie authentication middleware explictly, and ensure it's registered in the pipeline *after* Identity Server:

```csharp
services.AddIdentityServer()
    ...

services
    .AddAuthentication("MyCookie")
    .AddCookie("MyCookie", options =>
    {
        options.Cookie.Name = IdentityServerConstants.DefaultCookieAuthenticationScheme;
        options.EventsType = typeof(CustomCookieAuthenticationEvents);
    });

services.AddScoped<CustomCookieAuthenticationEvents>();
```

> Note that you can use any name you wish for your custom cookie, here we are using the default `IdentityServerConstants.DefaultCookieAuthenticationScheme` value of `idsrv`.

Here, we register a new `CustomCookieAuthenticationEvents` type to handle cookie events:

```csharp
public class CustomCookieAuthenticationEvents : CookieAuthenticationEvents
{    
    public override Task ValidatePrincipal(CookieValidatePrincipalContext context)
    {
        // context.Principal can be validated here with custom logic,
        // if the principal isn't valid, you can invoke context.RejectPrincipal()
        // and call await context.HttpContext.SignOutAsync("MyCookie")
        // to remove the cookie
        return base.ValidatePrincipal(context);
    }

    public override Task SigningIn(CookieSigningInContext context)
    {
        // you can create an additional cookie here, for example:
        var options = new CookieOptions
        {
            Domain = context.CookieOptions.Domain,
            Path = context.CookieOptions.Path,
            HttpOnly = true,
        };

        context.Response.Cookies.Append("AnotherCookie", "MyValue", options);

        return base.SigningIn(context);
    }
}
```

