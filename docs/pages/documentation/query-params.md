# Query params

By default, we support these param names:

**filter** - filter GET result by AND type of condition

**relations** - receive joined relational resources in GET result (with all or selected fields)

**sortByDesc** - sort GET result by some field in DESC order

**sortByAsc** - sort GET result by some field in ASC order

**limit** - limit the amount of received resources

**page** - receive a portion of limited amount of resources


Here is the description of each of those using default params names:

### Filters

The way a filter should be formed is:

```console
/users?filter[columnName][operator][not]=value
```

* **columnName** -  (Required) - Name of column you want to filter.
* **operator** - (Optional | Default: `eq`) Type of operator you want to use.
* **not** - (Optional | Default: `false`) Negate the filter (Accepted values: yes|true|1).

#### Example filters

Filter all users whose id start with `1000`.

```console
/users?filter[name][sw]=1000
```

Filter all books whose author is `Gentrit`.

```console
/books?filter[author.name]=Gentrit
```

#### Operators

Type | Description
---- | -----------
ct | String contains
sw | Starts with
ew | Ends with
eq | Equals
gt | Greater than
gte| Greater than or equalTo
lt | Lesser than
lte | Lesser than or equalTo
in | In array
bt | Between

### Pagination
Two parameters are available: limit and page. limit will determine the number of records per page and page will determine the current page.

```console
/books?limit=10&page=3
```

Will return books number 30-40.

### Sorting

The `sortByAsc` and `sortByDesc` query parameters are used to determine by which property the results collection will be ordered. 

#### Usage

The following query parameter `sortByAsc` will sort results by  from the lowest value to the highest value:

```console
/books?sortByAsc=id
```

The following query parameter `sortByDesc` will sort results by  from the highest value to the lowest value:

```console
/books?sortByDesc=id
```

#### Sort multiple columns

You can sort multiple columns separating them with a comma:

```console
/books?sortByDesc=id,name
```

### Including relationships

The `relations` query parameter will load any relation on the resulting models.

#### Basic usage

The following query parameter will include the `logs` relation:

```url
/users?relations=logs
```

Users will have all their their `logs` related models loaded.

#### Load multiple

You can load multiple relationships by separating them with a comma:

```url
/users?relations=logs,tasks
```

#### Load nested

You can load nested relationships using the dot `.` notation:

```url
/users?relations=logs.causer
```