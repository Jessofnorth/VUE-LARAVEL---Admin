# Discgolfbutiken

Denna webbplats är byggd med Vue.js som en Single Page Application.

De paket som finns i detta projekt är:

- Tailwind CSS
- Vite
- ESLint + Prettier
- Axios
- Vue
- Vue-router

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Projektets struktur

Samtliga anrop mot databasen görs med Axios och i de som kräver inloggningstoken skickas även denna med.
Anrop som görs är GET, PUT, POST och DELETE.

### Routes

| path                 | name         | component        | beskrivning                          | kräver inloggningstoken? |
| -------------------- | ------------ | ---------------- | ------------------------------------ | ------------------------ |
| "/"                  | admin        | AdminView        | startsidan                           | X                        |
| "/login"             | login        | LoginView        | loginsida med formulär               |                          |
| "/register"          | register     | RegisterView     | registrerings sida med formulär      |                          |
| "/products"          | products     | ProductsView     | Produktsida som loopar ut produkter  | X                        |
| "/editproduct/:id"   | editproduct  | EditProductView  | Sida för att uppdatera produkter     | X                        |
| "/categorys"         | categorys    | CategorysView    | Sida som loopar ut kategorier        | X                        |
| "/editcategory/:id"  | editcategory | EditCategoryView | Sida för att uppdatera kategori      | X                        |
| "/brands"            | brands       | BrandsView       | Sida som loopar ut alla märken       | X                        |
| "/editbrand/:id"     | editbrand    | EditBrandView    | Sida för att uppdatera märken        | X                        |
| "/discounts"         | discounts    | DiscountsView    | Sida som loopar ut rabatter          | X                        |
| "/editdiscount/:id"  | editdiscount | EditDiscountView | Sida för att uppdatera rabatter      | X                        |
| "/users"             | users        | UsersView        | Sida som loopar ut användare         | X                        |
| "/edituser/:id"      | edituser     | EditUserView     | Sida för att uppdatera användare     | X                        |
| "/search/:str"       | search       | SearchView       | Sida som visar sökresultat           | X                        |
| "/category/sort/:id" | categorysort | CategorySortView | Sida som visar sortering på kategori | X                        |
| "/brand/sort/:id"    | brandsort    | BrandSortView    | sida som visar sortering på märke    | X                        |
| "/discount/sort/:id" | discountsort | DiscountSortView | sida som visar sortering på rabatt   | X                        |
| "/:pathMatch(._)_"   | notfound     | NotFoundView     | 404 not found sida med admin länk    | X                        |

### Views

| Views            | beskrivning                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| AdminView        | startsidan som visar antal discar i lager samt information                                                      |
| LoginView        | loginsida med formulär                                                                                          |
| RegisterView     | registrerings sida med formulär                                                                                 |
| ProductsView     | Produktsida som loopar ut produkter samt har formulär för att lägga till och knappar för att ändra eller radera |
| EditProductView  | Sida för att uppdatera produkter med formulär som läser in nuvarande info                                       |
| CategorysView    | Sida som loopar ut kategorier samt har formulär för att lägga till och knappar för att ändra eller radera       |
| EditCategoryView | Sida för att uppdatera kategori med formulär som läser in nuvarande info                                        |
| BrandsView       | Sida som loopar ut alla märken samt har formulär för att lägga till och knappar för att ändra eller radera      |
| EditBrandView    | Sida för att uppdatera märken med formulär som läser in nuvarande info                                          |
| DiscountsView    | Sida som loopar ut rabatter samt har formulär för att lägga till och knappar för att ändra eller radera         |
| EditDiscountView | Sida för att uppdatera rabatter med formulär som läser in nuvarande info                                        |
| UsersView        | Sida som loopar ut användare samt har formulär för att lägga till och knappa för att radera                     |
| EditUserView     | Sida för att uppdatera användare med formulär som läser in nuvarande info                                       |
| SearchView       | Sida som visar sökresultat samt har knappar för att ändra eller radera produkter                                |
| CategorySortView | Sida som visar sortering på kategori samt har knappar för att ändra eller radera produkter                      |
| BrandSortView    | sida som visar sortering på märke samt har knappar för att ändra eller radera produkter                         |
| DiscountSortView | sida som visar sortering på rabatt samt har knappar för att ändra eller radera produkter                        |
| NotFoundView     | 404 not found sida med admin länk                                                                               |

### Komponenter

| Komponent            | beskrivning                                                                      | View/component den finns i                                                  |
| -------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| AddBrandsComp        | Formulär för att addera märke                                                    | BrandsView                                                                  |
| AddCategoryComp      | Formulär för att addera kategori                                                 | CategorysView                                                               |
| AddDiscountsComp     | Formulär för att addera rabatt                                                   | DiscountsView                                                               |
| AddProductComp       | Formulär för att addera produkt                                                  | ProductsView                                                                |
| BrandOptionsComp     | Options element som loopas ut till select i formulär samt sidebar                | EditProductView, AddProductComp, HeaderComp, SidebarComp                    |
| BrandsComp           | Skapar card för varje märke med information och med ändra och radera knappar     | BrandsView                                                                  |
| CategoryOptionComp   | Options element som loopas ut till select i formulär samt sidebar                | EditProductView, AddProductComp, HeaderComp, SidebarComp                    |
| CategorysComp        | Skapar card för varje kategori med information och med ändra och radera knappar  | CategorysView                                                               |
| DiscountOptionComp   | Options element som loopas ut till select i formulär samt sidebar                | EditProductView, AddProductComp, HeaderComp, SidebarComp                    |
| DiscountsComp        | Skapar card för varje rabatt med information och med ändra och radera knappar    | DiscountsView                                                               |
| FooterComp           | Innehåller lite info                                                             | App                                                                         |
| HeaderComp           | Har logotyp samtmeny knapp i mobil/surfplatteläge                                | App                                                                         |
| LoginForm            | Formulär för att logga in med email och lösenord                                 | LoginView                                                                   |
| ProductComp          | Skapar card för varje produkt med information och med ändra och radera knappar   | ProductsView, BrandSortView, DiscountSortView, CategorySortView, SearchView |
| RegisterForm         | Formulär för att skapa användare i utloggat läge                                 | RegisterView                                                                |
| RegisterFormLoggedin | Formulär för att skapa användare i inloggat läge                                 | UsersView                                                                   |
| SidebarComp          | Sidomeny med länkar, sök, logga ut och sortering                                 | App                                                                         |
| UsersComp            | Skapar card för varje användare med information och med ändra och radera knappar | UsersView                                                                   |
