# How to run server
There are two ways to run the server:

- Open the project in intellij and click the green arrow "run 'application'"
  or press shift + f10.

- Open a command prompt in the root server directory and type `mvn spring-boot:run`.

Once the server has launched and no error have occurred
either type `curl localhost:8080` in a command prompt or
type `localhost:8080` in the address field of a browser.

## Running with modified application properties

To override a default application property add `-Dspring-boot.run.arguments="'property1={value1} property2={value2}'"`
to the end of `mvn spring-boot:run`.
That is, if we want to modify the server port to 1337 we write:
    `mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=1337"`.

**<font color="orange"> Note!</font>  (for Windows users):** This will not work in powershell (default intellij terminal) because of formatting. Use the normal windows commandline.

### Using an api key
To use an api key we want to override the default api key property when launching the server.
To do this type `mvn spring-boot:run -Dspring-boot.run.arguments="--wix.apikey={your key}"` 
where you replace `{your key}` with your api key.
