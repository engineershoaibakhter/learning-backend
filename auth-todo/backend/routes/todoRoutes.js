const express=require('express');
const router=express.Router();
const {protect}=require('../middlewares/authMiddleware')
const {createTodo,getTodos,updateTodo,deleteTodo}=require('../controllers/todoController');
const {role}=require('../middlewares/roleMiddleware')

router.use(protect);

router.get('/dashboard',getTodos)
router.post('/dashboard',createTodo)

router.put('/dashboard/:id',updateTodo);
router.delete('/dashboard/:id',role('admin'),deleteTodo);

module.exports=router;