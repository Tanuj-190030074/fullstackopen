describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user={
      username: 'tanuj', password:'tanuj123'
    }
    cy.request('POST', 'http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

    it('Login form is shown', function() {
      cy.contains('Login to application')
    })
    describe('Login',()=>{
      it('user can login', function () {
        cy.get('#username').type('tanuj')
        cy.get('#password').type('tanuj123')
        cy.contains('login').click()
        cy.contains('tanuj logged in')
      })
  
     it('login fails with wrong password', function() {
        cy.get('#username').type('tanuj')
        cy.get('#password').type('wrong')
        cy.contains('login').click()
        cy.get('.error')
    .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'tanuj logged in')
  
      })
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({username:'tanuj',password:'tanuj123'})
      })
      it('a new blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('test blog title')
        cy.get('#author').type('test blog author')
        cy.get('#url').type('http//www.test.com')
        cy.get('#blogformbutton').click()
        cy.contains('a new blog test blog title by test blog author added')
        cy.contains('test blog title test blog author')
      })
      it('like button working', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('test blog title')
        cy.get('#author').type('test blog author')
        cy.get('#url').type('http//www.test.com')
        cy.get('#blogformbutton').click()
        cy.contains('test blog title test blog author').contains('view').click()
        cy.contains('0')
        cy.contains('likes').contains('like').click()
        cy.contains('1')
      })
    })

    describe('deleting a blog',()=>{
      beforeEach(()=>{
        cy.login({username:'tanuj',password:'tanuj123'})
        cy.createBlog({title:"test1",author:"test1author",url:"test1url"})
        cy.createBlog({title:"test2",author:"test2author",url:"test2url"})
        cy.createBlog({title:"test3",author:"test3author",url:"test3url"})
        const user={
          username: 'tanuj2', password:'tanuj123'
        }
        cy.request('POST', 'http://localhost:3003/api/users',user)
      })
      it('the user who created a blog can delete it',()=>{
          cy.contains('test1').contains('view').click()
          cy.contains('remove').click()
          cy.get('html').should('not.contain','test1')
      })
      it('the other user cannot delete the blog of other ones',()=>{
        cy.contains('logout').click()
        cy.get('#username').type('tanuj2')
        cy.get('#password').type('tanuj123')
        cy.contains('login').click()
        cy.contains('test1').contains('view').click().get('#removebutton').should('not.exist')
    })
    })

    describe('blogs arranged according to likes',() =>{
      beforeEach(()=>{
        cy.login({username:'tanuj',password:'tanuj123'})
        cy.createBlog({title:"test1",author:"test1author",url:"test1url"})
        cy.createBlog({title:"test2",author:"test2author",url:"test2url"})
        cy.createBlog({title:"test3",author:"test3author",url:"test3url"})
      })
      it('checking blogs arranged according to likes',()=>{
          cy.contains('test1').contains('view').click().get('#likebutton').click()
          cy.wait(200)
          cy.get('#likebutton').click()
          cy.wait(200)
          cy.get('#likebutton').click()
          cy.wait(200)
          cy.contains('test3').contains('view').click()
          cy.wait(200)
          cy.root().find('.invisibleatfirst').last().find('.likebutton').click()
          cy.root().find('.invisibleatfirst').first().find('.bloglikes').contains('3')
          cy.wait(200)
      })
    })
  })

