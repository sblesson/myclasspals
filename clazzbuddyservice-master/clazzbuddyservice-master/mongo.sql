use clazzbuddy
db.createUser(
   {
     user: "clazz",
     pwd: "buddy",
     roles: [ { role: "dbOwner", db: "clazzbuddy" } ]
   }
)
