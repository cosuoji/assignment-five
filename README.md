# assignment-five
 
************************ Assignment 05 ************************

Note!!!
- Test - all service functions should have at least a unit test

Create a web app that hast the following features
1. As a user i want to be able to register on the app
2. As a user i want to be able to login
3. As a user i want to be able to create a post
4. As a user i want to be able to update my post
5. As a user i want to be able to see everyone's post. (my post and everyone's post)
6. As a user i want to be able to get a single post. (my post and everyone's post)
7. As a user i want to be able to delete my post. (i should'nt be able to delete another users post)

==== Register ====
> POST {{baseUrl}}/register
> Payload { name: 'John', email: 'any@email.com', password: '', confirmPassword: ''}
> Success Response {
    message: 'Any success message you like',
    data: {
      id: 'string',
      name: 'string',
      email: 'string',
      -password: 'do not include passwords',
      updatedAt: {{date}},
      createdAt: {{date}}
    }  
  }
> Error 400 Response {
    message: 'any error message',
    error?: { }, -- error object if any.
  }

==== Login ====
> POST {{baseUrl}}/login
> Payload { email: 'any@email.com', password: ''}
> Success Response {
    message: 'Login successful',
    data: {
      accessToken: 'eeee.eeee.eeee',
      user: {
        id: 'string',
        name: 'string',
        email: 'string',
        -password: 'do not include passwords',
        updatedAt: {{date}},
        createdAt: {{date}}
      }
    }  
  }
> Error 401 Response {
    message: 'Unauthorized',
    error?: { }, -- error object if any.
  }
> Error 400 Response {
    message: 'Bad Request', --- possibly validation failure
    error?: { }, -- error object if any.
  }


==== Create Post ====
> POST {{baseUrl}}/posts
> Header { Content-Type: application/json, Authorization: Bearer {{token}} }
> Payload { title: 'any@email.com', body: '' }
> Success Response {
    message: 'Post created',
    data: {
      id: string,
      title: 'string',
      body: 'string',
      user: {
        id: 'string',
        name: 'string',
        email: 'string',
        updatedAt: {{date}},
        createdAt: {{date}}
      },
      updatedAt: {{date}},
      createdAt: {{date}}
    }  
  }
> Error 400 Response {
    message: 'Bad Request', --- possibly validation failure
    error?: { }, -- error object if any.
  }


==== Update Post ====
> PATCH {{baseUrl}}/posts/{{postId}}
> Header { Content-Type: application/json, Authorization: Bearer {{token}} }
> Payload { title?: 'any@email.com', body?: '' } --- Either title or body can be updated
> Success Response {
    message: 'Post updated successfully',
    data: {
      id: string,
      title: 'string',
      body: 'string',
      user: {
        id: 'string',
        name: 'string',
        email: 'string',
        updatedAt: {{date}},
        createdAt: {{date}}
      },
      updatedAt: {{date}},
      createdAt: {{date}}
    }  
  }
> Error 400 Response {
    message: 'Bad Request', --- possibly validation failure
    error?: { }, -- error object if any.
  }
> Error 404 Response {
    message: 'Post not found',
  }
--- Only creator of the post should be able to update their post

==== Get all post ====
> GET {{baseUrl}}/posts?limit=10&page=1&order=desc&orderBy=createdAt
> Header { Content-Type: application/json, Authorization: Bearer {{token}} }
> Success Response {
    message: 'All posts',
    data: [
      {
        id: string,
        title: 'string',
        body: 'string',
        user: {
          id: 'string',
          name: 'string',
          email: 'string',
          updatedAt: {{date}},
          createdAt: {{date}}
        },
        updatedAt: {{date}},
        createdAt: {{date}}
      },
      {
        id: string,
        title: 'string',
        body: 'string',
        user: {
          id: 'string',
          name: 'string',
          email: 'string',
          updatedAt: {{date}},
          createdAt: {{date}}
        },
        updatedAt: {{date}},
        createdAt: {{date}}
      },
      ...
    ]  
  }
> Error 400 Response {
    message: 'Bad Request', --- possibly validation failure
    error?: { }, -- error object if any.
  }


==== Get a post ====
> GET {{baseUrl}}/posts/{{postId}}
> Header { Content-Type: application/json, Authorization: Bearer {{token}} }
> Success Response {
    message: 'Post',
    data: {
      id: string,
      title: 'string',
      body: 'string',
      user: {
        id: 'string',
        name: 'string',
        email: 'string',
        updatedAt: {{date}},
        createdAt: {{date}}
      },
      updatedAt: {{date}},
      createdAt: {{date}}
    }
  }
> Error 400 Response {
    message: 'Bad Request', --- possibly validation failure
    error?: { }, -- error object if any.
  }
> Error 404 Response {
    message: 'Post not found',
  }

==== Delete a post ====
> GET {{baseUrl}}/posts/{{postId}}
> Header { Content-Type: application/json, Authorization: Bearer {{token}} }
> Success Response {
    message: 'All posts',
    data: {
      id: string,
      title: 'string',
      body: 'string',
      user: {
        id: 'string',
        name: 'string',
        email: 'string',
      },
    }
  }
> Error 400 Response {
    message: 'Bad Request', --- possibly validation failure
    error?: { }, -- error object if any.
  }
> Error 404 Response {
    message: 'Post not found',
  }

For the completion of this assignment
Assignment needs to be hosted.
the url to the app should be submitted.
1. For free hosting checkout. Cyclic
  https://app.cyclic.sh/#/join/tobioye88
2. How to host on cyclic
  https://www.youtube.com/watch?v=HtqucM3BP5Q