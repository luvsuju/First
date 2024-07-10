const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration -> MongoDB connected
const uri =
  'mongodb+srv://mern-book-store:Park15hoseok@cluster0.1ab2bzo.mongodb.net/BookInventory?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create a collection of documents
    const bookCollection = client.db('BookInventory').collection('books');

    // Insert a book to the database using the POST method
    app.post('/upload-book', async (req, res) => {
      const data = req.body;
      const result = await bookCollection.insertOne(data);
      res.send(result);
    });

    // Update a book: PATCH or UPDATE method
    app.patch('/book/:id*', async (req, res) => {
      try {
        const id = req.params.id;
        console.log('Received ID:', id);
    
        // Check if the provided ID is a valid ObjectId
        if (!ObjectId.isValid(id)) {
          console.log('Invalid ID Format');
          return res.status(400).send({ success: false, message: 'Invalid book ID format.', receivedID: id });
        }
    
        const updateBookData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            bookTitle: updateBookData.bookTitle,
            authorName: updateBookData.authorName,
            imageURL: updateBookData.imageURL,
            category: updateBookData.category,
            bookDescription: updateBookData.bookDescription,
            bookPDFURL: updateBookData.bookPDFURL,
          },
        };
        const options = { upsert: true };
    
        // Update
        const result = await bookCollection.updateOne(filter, updateDoc, options);
    
        if (result.modifiedCount > 0 || result.upsertedCount > 0) {
          // If the update was successful, retrieve the updated document
          const updatedBook = await bookCollection.findOne(filter);
          res.send(updatedBook);
        } else {
          res.status(404).send({ success: false, message: 'Book not found.' });
        }
      } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send({ success: false, message: 'Internal server error.', error: error.message });
      }
    });

    //delete

    app.delete('/book/:id*', async (req, res) => {
      try {
        const id = req.params.id;
        console.log('Received ID for deletion:', id);

        // Check if the provided ID is a valid ObjectId
        if (!ObjectId.isValid(id)) {
          console.log('Invalid ID Format');
          return res.status(400).send({ success: false, message: 'Invalid book ID format.', receivedID: id });
        }

        const filter = { _id: new ObjectId(id) };

        // Delete
        const result = await bookCollection.deleteOne(filter);

        if (result.deletedCount > 0) {
          res.send({ success: true, message: 'Book deleted successfully.' });
        } else {
          res.status(404).send({ success: false, message: 'Book not found for deletion.' });
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send({ success: false, message: 'Internal server error.', error: error.message });
      }
    });


    // Find books by category
    app.get('/all-books', async (req, res) => {
      try {
        let query = {};
        if (req.query?.category) {
          query = { category: req.query.category };
        }
        const result = await bookCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error('Error finding books by category:', error);
        res.status(500).send({ success: false, message: 'Internal server error.', error: error.message });
      }
    });

    //to get single book data

    app.get("/book/:id", async(req,res)=>{
      const id = req.params.id;
      const filter={_id: new ObjectId(id)};
      const result= await bookCollection.findOne(filter);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Close the MongoDB connection when the application exits
    process.on('SIGINT', async () => {
      console.log('Closing MongoDB connection');
      await client.close();
      process.exit();
    });
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});