const Recipe = require('../models/Recipe')

function indexRoute(req, res, next) {
  Recipe.find()
    .then(resorts => res.json(resorts))
    .catch(next)
}

function showRoute(req, res, next) {
  Recipe.findById(req.params.id)
    .populate('createdBy')
    .populate('comments.user')
    .then(resort => res.json(resort))
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.createdBy = req.currentUser
  Recipe.create(req.body)
    .then(recipe => res.status(201).json(recipe))
    .catch(next)
}

function updateRoute(req, res, next) {
  req.body.modifiedBy = req.currentUser
  Recipe.findById(req.params.id)
    .then(recipe => recipe.set(req.body))
    .then(recipe => recipe.save())
    .then(recipe => res.json(recipe))
    .catch(next)
}

function deleteRoute(req, res, next) {
  Recipe.findById(req.params.id)
    .then(recipe => recipe.remove())
    .then(() => res.sendStatus(204))
    .catch(err => res.status(422).json(err))
    .catch(next)
}
function commentCreateRoute(req, res, next) {
  //  add the currentUser to the data
  req.body.user = req.currentUser // this comes from `secureRoute`
  // find the character we want to add a comment to
  Recipe.findById(req.params.id)
    .populate('comments.user')
    .then(recipe => {
      // add a comment to the character
      recipe.comments.push(req.body)
      return recipe.save()
    })
    .then(recipe => res.json(recipe))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  // find the character we want to delete the comment from
  Recipe.findById(req.params.id)
    .then(recipe => {
      const comment = recipe.comments.id(req.params.commentId) // find the comment by its ID
      comment.remove() // remove the comment
      return recipe.save() // save the character
    })
    .then(recipe => res.json(recipe))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
