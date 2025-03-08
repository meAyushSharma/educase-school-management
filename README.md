<h1 align="center">Educase Assignment : School management</h1>

### Routes
1. /addSchool : POST     
```sh
# expected payload
    {
        "name": "mysch8",
        "address": "sch8 add",
        "latitude": 37.6448,
        "longitude": 88.8873
    }
```     
```sh
# expected response
    {
        "msg": "School mysch8 created successfully",
        "success": true
    }
```     
2. /listSchools : GET    
```sh
# expected params
    latitude=37.7041
    longitude=88.1025
```    
```sh
# expected response
    {
        "msg": "Fetched all the schools sorted according to proximity of each from user",
        "schools": [
            {
                "id": 3,
                "name": "mysch3",
                "address": "sch3 add",
                "latitude": 37.7041,
                "longitude": 88.1025
            },
            {
                "id": 12,
                "name": "mysch8",
                "address": "sch8 add",
                "latitude": 37.6448,
                "longitude": 88.2167
            },
            {
                "id": 11,
                "name": "mysch13",
                "address": "sch13 add",
                "latitude": 37.708,
                "longitude": 88.25
            },
            {
                "id": 10,
                "name": "mysch5",
                "address": "sch5 add",
                "latitude": 37.6139,
                "longitude": 88.209
            },
            {
                "id": 9,
                "name": "mysch6",
                "address": "sch6 add",
                "latitude": 37.5276,
                "longitude": 88.0689
            },
            {
                "id": 8,
                "name": "mysch12",
                "address": "sch12 add",
                "latitude": 37.5335,
                "longitude": 88.2
            },
            {
                "id": 7,
                "name": "mysch14",
                "address": "sch14 add",
                "latitude": 37.5352,
                "longitude": 88.2665
            },
            {
                "id": 6,
                "name": "mysch7",
                "address": "sch7 add",
                "latitude": 37.4593,
                "longitude": 88.0729
            },
            {
                "id": 5,
                "name": "mysch11",
                "address": "sch11 add",
                "latitude": 37.6758,
                "longitude": 88.4126
            },
            {
                "id": 4,
                "name": "mysch10",
                "address": "sch10 add",
                "latitude": 37.408,
                "longitude": 88.105
            },
            {
                "id": 13,
                "name": "mysch8",
                "address": "sch8 add",
                "latitude": 37.6448,
                "longitude": 88.8873
            },
            {
                "id": 1,
                "name": "mysch1",
                "address": "sch1 add",
                "latitude": 28.7041,
                "longitude": 77.1025
            },
            {
                "id": 2,
                "name": "mysch2",
                "address": "sch2 add",
                "latitude": 25.7041,
                "longitude": 78.1025
            }
        ],
        "success": false
    }
```      
3. /health : GET
```sh
# expected response
{"msg":"Server is in healthy state","success":true}
```    

### Features    
1. Dockerized the application.    
2. Handled global exceptions with logging errors.   
3. Used typescript.    