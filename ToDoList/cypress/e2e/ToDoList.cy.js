describe("ToDoList: 📝", () => {
  const todoUrl = "https://todolist.james.am/#/";
  const inputSelector = 'input[placeholder="What need\'s to be done?"]';

  context("Basic tests:", () => {

    // Hook that runs before each test to visit the todo list page:
    beforeEach(() => {
      cy.visit(todoUrl);
    });

    it("1. Is <header> tag present in the page?", () => {
      cy.get("header").should("be.visible"); 
    });


    it("2. Does <header> contain text value of 'To Do List'?", () => {
      cy.get("header").should("contain.text", "To Do List"); 
    });


    it("3. Does 'Double-click to edit a todo' text get rendered?", () => {
      cy.get("footer p")
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal("Double-click to edit a todo"); 
        });
    });


    it("4. Does the input field contain placeholder text 'What need's to be done?'", () => {
      cy.get(inputSelector)
        .should("have.attr", "placeholder", "What need's to be done?"); 
    });


    it("5. After populating a list with tasks, verify the list is not empty", () => {
      const tasks = ["test1", "test2", "test3"];

      tasks.forEach((task) => {
        cy.get("input.new-todo").type(`${task}{enter}`); 
      });


      cy.get("ul.todo-list li")

      // Ensure there are 3 tasks:
        .should("have.length", tasks.length) 
        .each((item, index) => {
          
      // Assert that each list item contains the correct task text:
          cy.wrap(item).should("contain.text", tasks[index]);
        });

      // Assert that the input field is not empty after adding tasks:
      cy.get("input.new-todo").should("not.have.value", "");
    });
  });
});
