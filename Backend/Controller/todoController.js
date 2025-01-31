const Todo = require('../model/Todo.js');
const user = require('../model/User.js')
const createTodo = async (req,res) =>{
    try {
        const {title,description} = req.body;
     if(!req.user){
        return res.status(400).json({message:"User not found"})
     }
     if(!title || !description){
        return res.status(400).json({message:"Please fill all fields"})
     }
     const newTodo = new Todo ({
        title:title,
        description:description,
        user:user._id

     })
     await newTodo.save()
     res.status(201).json({ message: "Todo created successfully", todo: newTodo });



    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Error creating todo" , error });
    }
}

const getTodos = async (req,res) =>{
    try {
        
        const todos = await Todo.find({ user: req.user._id });

        res.status(200).json(todos);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Error fetching todos" , error });
    }
}

const updateTodo = async (req,res) =>{
    try {
       const {id} = req.params;
       const {title,description, complete} = req.body;

       const  TodoFind = await Todo.findById(id);
       if(!TodoFind){
        res.status(404).send("Todo not found");
       }
    // update in the way 
    if(title) Todo.title = title;
    if(description) Todo.description = description;
    if(complete !== undefined) Todo.complete = complete;
    await TodoFind.save();
    res.status(200).json({ message: "Todo updated successfully", updateTodo});
   
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Update todo error" , error})
    }
}


const deleteTodo = async (req,res) =>{
    try {
        const {id} = req.params;
        const TodoFind = await Todo.findById(id);
        if(!TodoFind){
            res.status(404).send("Todo not found");
        }
        await TodoFind.remove();
        res.status(200).json({message : "Todo deleted successfully" , TodoFind});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "delete the todo error" , error});
    }
}
module.exports = { createTodo, getTodos, updateTodo, deleteTodo };

