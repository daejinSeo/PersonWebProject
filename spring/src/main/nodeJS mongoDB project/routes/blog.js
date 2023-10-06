const express = require('express');

const mongodb = require('mongodb');
const router = express.Router();

const db = require('../data/database');
const ObjectId = mongodb.ObjectId;

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
  const posts = await db.getDb().collection('posts').find().toArray();
  console.log(posts);
  res.render('posts-list', {posts: posts});
});

router.get('/new-post', async function(req, res) {
  const authors = await db.getDb().collection('authors').find().toArray();
  console.log(authors);
  res.render('create-post', {authors : authors});
});

router.post('/posts', async function(req, res){
  const authorId = new ObjectId(req.body.author);
  const author = await db.getDb().collection('authors').findOne({_id: authorId});

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
      phone: author.phone
    }
  }
  
  const result = await db.getDb().collection('posts').insertOne(newPost);
  console.log(result);
  res.redirect('/posts');
});


router.get('/posts/:id', async function(req, res){
  // const posts = await db.getDb().collection('posts').find().toArray();
  // console.log(posts);
  // res.render('post-detail', {post: posts});

  try{
    const postId = req.params.id;
    const post = await db.getDb().collection('posts').findOne({_id: new ObjectId(postId)}, {summary: 0});
  
    if(!post){
      return res.status(404).render('404');
    }
    // console.log(post);
  
    post.humanReadableDate = post.date.toLocaleDateString('ko-KR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    post.date =post.date.toISOString();
    res.render('post-detail', {post: post});
  }
  catch(error){
    return res.status(404).render('404');
  }


});

router.get('/update-post/:id', async function(req, res){
  try{
    const updatePostId = req.params.id;
    const post = await db.getDb().collection('posts').findOne({_id: new ObjectId(updatePostId)}, {_id: 1, title:1, summary: 1, body: 1, content: 1});
    if(!post){
      return res.status(404).render('404');
    }
    
    res.render('update-post', {post: post});
  }
  catch(error){
    return res.status(404).render('404');
  }
});


// form action에서 id값만 전달하면 여기로 옴
router.post('/update-post/:id', async function(req, res){


  const id = new ObjectId(req.body.hid);
  // console.log(id);
  const postTitle = req.body.title;
  const postSummary = req.body.summary;
  const postBody = req.body.content;

  const updateQuery= {$set: {title: postTitle, summary: postSummary, body: postBody, date: new Date()}};
  // console.log(id);
  const result = await db.getDb().collection('posts')
  .updateOne({_id: id}, updateQuery);
  // console.log(result);

  res.redirect('/posts/' + id);
});

router.get('/post/:id/delete', function(req, res){
  res.status(400).send('Invalid request. Use POST to delete a post.');
});

router.post('/post/:id/delete', async function(req, res){
  try{
    const id = new ObjectId(req.params.id);
    console.log(id);
    const deleteQuery= await db.getDb().collection('posts').deleteOne({ _id: id });
    console.log(deleteQuery);
    if (deleteQuery.deletedCount === 1) {
      return res.redirect('/posts');
    } else {
      return res.status(404).send('Post not found'); // 게시물이 없는 경우
    }

    
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).send('Internal Server Error');
  }
  
 
});

module.exports = router;