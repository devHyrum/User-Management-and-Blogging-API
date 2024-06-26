import { Router } from 'express'
import { createCategory, createCommentary, createPost, createUser, deleteCategory, deleteCommentary, deletePostAndImageAndComments, deleteUserAndImage, getAllCategories, getAllComments, getCategory, getPostByTitle, getPostCommunity, getPostOwn, getUsers, updateCategory, updateCommentary, updatePost, updateUser } from '../src/userController.js'
import { uploadImage, uploadPost } from '../config/multer.js'
import { manejarErrorArchivo } from '../src/helper.js'

const router = Router()
// Gestión de Usuarios:
router.get('/access/:id/:username', getUsers)
router.post('/access/createUser', uploadImage.single('imagen'), createUser)
router.put('/access/update/:id/:name', uploadImage.single('imagen'), updateUser, manejarErrorArchivo)
router.delete('/access/delete/:id/:username', deleteUserAndImage)
// Gestión de Publicaciones:
router.post('/post/newPost/:id/:nombre', uploadPost.single('imagen'), createPost)
router.put('/post/update/:id/:codePost', uploadPost.single('imagen'), updatePost, manejarErrorArchivo)
router.get('/post/view/:user/myposts', getPostOwn)
router.get('/post/view/communityposts', getPostCommunity)
router.get('/post/view/category/:nameCategory', getCategory)
router.delete('/post/delete/:id/:user_id', deletePostAndImageAndComments)
router.get('/post/view/:title', getPostByTitle)
// Gestión de Categorías:
router.get('/access/:id/:username/allCategories', getAllCategories)
router.post('/access/:id/:username/createCategory', createCategory)
router.put('/access/:id/:username/categories/:idCategory', updateCategory)
router.delete('/access/:id/:username/categories/:idCategory', deleteCategory)
// Gestión de Comentarios:
router.get('/post/:post_id/comments', getAllComments)
router.post('/post/:post_id/createComment/:user_id', createCommentary)
router.delete('/post/:post_id/comment/:id/:user_id', deleteCommentary)
router.put('/post/:post_id/comment/:id/:user_id', updateCommentary)
router.get('*', (req, res) => res.end('GET: No se encontró la ruta'))

export default router
