export const exampleOpenApiSpec = `openapi: 3.0.0
info:
  description: "This is a sample server Petstore server.  You can find out more about
    Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net,
    #swagger](http://swagger.io/irc/).  For this sample, you can use the api key
    'special-key' to test the authorization filters."
  version: 1.0.2
  title: Swagger Petstore
  termsOfService: http://swagger.io/terms/
  contact:
    email: apiteam@swagger.io
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
tags:
  - name: pet
    description: Everything about your Pets
    externalDocs:
      description: Find out more
      url: http://swagger.io
  - name: store
    description: Access to Petstore orders
  - name: user
    description: Operations about user
    externalDocs:
      description: Find out more about our store
      url: http://swagger.io
paths:
  /pet:
    post:
      tags:
        - pet
      summary: Add a new pet to the store
      description: ""
      operationId: addPet
      requestBody:
        $ref: "#/components/requestBodies/Pet"
      responses:
        "405":
          description: Invalid input
    put:
      tags:
        - pet
      summary: Update an existing pet
      description: ""
      operationId: updatePet
      requestBody:
        $ref: "#/components/requestBodies/Pet"
      responses:
        "400":
          description: Invalid ID supplied
        "404":
          description: Pet not found
        "405":
          description: Validation exception
  /pet/findByStatus:
    get:
      tags:
        - pet
      summary: Finds Pets by status
      description: Multiple status values can be provided with comma separated strings
      operationId: findPetsByStatus
      parameters:
        - name: status
          in: query
          description: Status values that need to be considered for filter
          required: true
          explode: true
          schema:
            type: array
            items:
              type: string
              enum:
                - available
                - pending
                - sold
              default: available
      responses:
        "200":
          description: successful operation
          content:
            application/xml:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Pet"
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Pet"
        "400":
          description: Invalid status value
  /pet/findByTags:
    get:
      tags:
        - pet
      summary: Finds Pets by tags
      description: Multiple tags can be provided with comma separated strings. Use tag1,
        tag2, tag3 for testing.
      operationId: findPetsByTags
      parameters:
        - name: tags
          in: query
          description: Tags to filter by
          required: true
          explode: true
          schema:
            type: array
            items:
              type: string
      responses:
        "200":
          description: successful operation
          content:
            application/xml:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Pet"
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Pet"
        "400":
          description: Invalid tag value
      deprecated: true
  "/pet/{petId}":
    get:
      tags:
        - pet
      summary: Find pet by ID
      description: Returns a single pet
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          description: ID of pet to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        "200":
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: "#/components/schemas/Pet"
            application/json:
              schema:
                $ref: "#/components/schemas/Pet"
        "400":
          description: Invalid ID supplied
        "404":
          description: Pet not found
    post:
      tags:
        - pet
      summary: Updates a pet in the store with form data
      description: ""
      operationId: updatePetWithForm
      parameters:
        - name: petId
          in: path
          description: ID of pet that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                name:
                  description: Updated name of the pet
                  type: string
                status:
                  description: Updated status of the pet
                  type: string
      responses:
        "405":
          description: Invalid input
    delete:
      tags:
        - pet
      summary: Deletes a pet
      description: ""
      operationId: deletePet
      parameters:
        - name: api_key
          in: header
          required: false
          schema:
            type: string
        - name: petId
          in: path
          description: Pet id to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        "400":
          description: Invalid ID supplied
        "404":
          description: Pet not found
  /store/inventory:
    get:
      tags:
        - store
      summary: Returns pet inventories by status
      description: Returns a map of status codes to quantities
      operationId: getInventory
      responses:
        "200":
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                additionalProperties:
                  type: integer
                  format: int32
  /store/order:
    post:
      tags:
        - store
      summary: Place an order for a pet
      description: ""
      operationId: placeOrder
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Order"
        description: order placed for purchasing the pet
        required: true
      responses:
        "200":
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: "#/components/schemas/Order"
            application/json:
              schema:
                $ref: "#/components/schemas/Order"
        "400":
          description: Invalid Order
  "/store/order/{orderId}":
    get:
      tags:
        - store
      summary: Find purchase order by ID
      description: For valid response try integer IDs with value >= 1 and <= 10. Other
        values will generated exceptions
      operationId: getOrderById
      parameters:
        - name: orderId
          in: path
          description: ID of pet that needs to be fetched
          required: true
          schema:
            type: integer
            format: int64
            minimum: 1
            maximum: 10
      responses:
        "200":
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: "#/components/schemas/Order"
            application/json:
              schema:
                $ref: "#/components/schemas/Order"
        "400":
          description: Invalid ID supplied
        "404":
          description: Order not found
    delete:
      tags:
        - store
      summary: Delete purchase order by ID
      description: For valid response try integer IDs with positive integer value. Negative
        or non-integer values will generate API errors
      operationId: deleteOrder
      parameters:
        - name: orderId
          in: path
          description: ID of the order that needs to be deleted
          required: true
          schema:
            type: integer
            format: int64
            minimum: 1
      responses:
        "400":
          description: Invalid ID supplied
        "404":
          description: Order not found
  /user:
    post:
      tags:
        - user
      summary: Create user
      description: This can only be done by the logged in user.
      operationId: createUser
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/User"
        description: Created user object
        required: true
      responses:
        default:
          description: successful operation
  /user/createWithArray:
    post:
      tags:
        - user
      summary: Creates list of users with given input array
      description: ""
      operationId: createUsersWithArrayInput
      requestBody:
        $ref: "#/components/requestBodies/UserArray"
      responses:
        default:
          description: successful operation
  /user/createWithList:
    post:
      tags:
        - user
      summary: Creates list of users with given input array
      description: ""
      operationId: createUsersWithListInput
      requestBody:
        $ref: "#/components/requestBodies/UserArray"
      responses:
        default:
          description: successful operation
  /user/login:
    get:
      tags:
        - user
      summary: Logs user into the system
      description: ""
      operationId: loginUser
      parameters:
        - name: username
          in: query
          description: The user name for login
          required: true
          schema:
            type: string
        - name: password
          in: query
          description: The password for login in clear text
          required: true
          schema:
            type: string
      responses:
        "200":
          description: successful operation
          headers:
            X-Rate-Limit:
              description: calls per hour allowed by the user
              schema:
                type: integer
                format: int32
            X-Expires-After:
              description: date in UTC when token expires
              schema:
                type: string
                format: date-time
          content:
            application/xml:
              schema:
                type: string
            application/json:
              schema:
                type: string
        "400":
          description: Invalid username/password supplied
  /user/logout:
    get:
      tags:
        - user
      summary: Logs out current logged in user session
      description: ""
      operationId: logoutUser
      responses:
        default:
          description: successful operation
  "/user/{username}":
    get:
      tags:
        - user
      summary: Get user by user name
      description: ""
      operationId: getUserByName
      parameters:
        - name: username
          in: path
          description: "The name that needs to be fetched. Use user1 for testing. "
          required: true
          schema:
            type: string
      responses:
        "200":
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: "#/components/schemas/User"
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "400":
          description: Invalid username supplied
        "404":
          description: User not found
    put:
      tags:
        - user
      summary: Updated user
      description: This can only be done by the logged in user.
      operationId: updateUser
      parameters:
        - name: username
          in: path
          description: name that need to be updated
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/User"
        description: Updated user object
        required: true
      responses:
        "400":
          description: Invalid user supplied
        "404":
          description: User not found
    delete:
      tags:
        - user
      summary: Delete user
      description: This can only be done by the logged in user.
      operationId: deleteUser
      parameters:
        - name: username
          in: path
          description: The name that needs to be deleted
          required: true
          schema:
            type: string
      responses:
        "400":
          description: Invalid username supplied
        "404":
          description: User not found
externalDocs:
  description: Find out more about Swagger
  url: http://swagger.io
servers:
  - url: https://petstore.swagger.io/v2
components:
  requestBodies:
    UserArray:
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: "#/components/schemas/User"
      description: List of user object
      required: true
    Pet:
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Pet"
        application/xml:
          schema:
            $ref: "#/components/schemas/Pet"
      description: Pet object that needs to be added to the store
      required: true
  schemas:
    Order:
      type: object
      properties:
        id:
          type: integer
          format: int64
        petId:
          type: integer
          format: int64
        quantity:
          type: integer
          format: int32
        shipDate:
          type: string
          format: date-time
        status:
          type: string
          description: Order Status
          enum:
            - placed
            - approved
            - delivered
        complete:
          type: boolean
          default: false
      xml:
        name: Order
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        username:
          type: string
        firstName:
          type: string
        lastName:
          type: string
        email:
          type: string
        password:
          type: string
        phone:
          type: string
        userStatus:
          type: integer
          format: int32
          description: User Status
      xml:
        name: User
    Category:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
      xml:
        name: Category
    Tag:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
      xml:
        name: Tag
    Pet:
      type: object
      required:
        - name
        - photoUrls
      properties:
        id:
          type: integer
          format: int64
        category:
          $ref: "#/components/schemas/Category"
        name:
          type: string
          example: doggie
        photoUrls:
          type: array
          xml:
            name: photoUrl
            wrapped: true
          items:
            type: string
        tags:
          type: array
          xml:
            name: tag
            wrapped: true
          items:
            $ref: "#/components/schemas/Tag"
        status:
          type: string
          description: pet status in the store
          enum:
            - available
            - pending
            - sold
      xml:
        name: Pet
    ApiResponse:
      type: object
      properties:
        code:
          type: integer
          format: int32
        type:
          type: string
        message:
          type: string
`;