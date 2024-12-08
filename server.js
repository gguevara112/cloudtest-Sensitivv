import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import bcrypt from 'bcrypt';
import axios from 'axios';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const clientG = new OAuth2Client('785282538969-nhq7ursh8lkblr90a9rvi0qlg2ejjqmk.apps.googleusercontent.com');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// Conexión a la base de datos
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("conecting to database");
  } catch (error) {
    console.error("Error> database conection", error);
  }
}

// Endpoint para obtener todos los artículos
app.get('/api/articles', async (req, res) => {
  try {
    const database = client.db('sensitivv');
    const collection = database.collection('articles');
    const articles = await collection.find().toArray();
    res.json(articles);
  } catch (error) {
    console.error("Error finding articles", error);
    res.status(500).json({ error: "Error finding articles" });
  }
});

// Endpoint para obtener un artículo por ID
app.get('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const database = client.db('sensitivv');
    const collection = database.collection('articles');
    const article = await collection.findOne({ _id: new ObjectId(id) });
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Error retrieving article:", error);
    res.status(500).json({ error: "Error retrieving article" });
  }
});

// Endpoint para registrar un usuario
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are obligatory' });
    }

    const database = client.db('sensitivv');
    const collection = database.collection('user');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'The email is already registered, use another' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await collection.insertOne({
      userID: new ObjectId().toString(),
      name,
      email,
      password: hashedPassword,
      language: 'en',
      trialPeriodDays: 5,
    });

    res.status(201).json({ message: 'User created', userId: result.insertedId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const database = client.db('sensitivv');
    const collection = database.collection('user');

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    res.status(200).json({ userId: user.userID, name: user.name });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



  // Endpoint para obtener información del usuario por ID
app.get('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const database = client.db('sensitivv');
      const collection = database.collection('user');
      
      const user = await collection.findOne({ userID: id }, { projection: { password: 0 } }); // Excluye el campo de contraseña
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Error fetching user" });
    }
  });
  

// Endpoint para actualizar preferencias del usuario
app.put('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { language, trialPeriodDays } = req.body;
  
      const database = client.db('sensitivv');
      const collection = database.collection('user');
  
      const result = await collection.updateOne(
        { userID: id },
        { $set: { language, trialPeriodDays } }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      res.status(200).json({ message: "Preferencias actualizadas exitosamente" });
    } catch (error) {
      console.error("Error al actualizar preferencias del usuario:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
  app.post('/api/productnotes', async (req, res) => {
    try {
      const { userID, itemID, note, dateCreated } = req.body;
      const database = client.db('sensitivv');
      const collection = database.collection('productnotes');
  
      await collection.insertOne({ userID, itemID, note, dateCreated });
      res.status(201).json({ message: "Nota guardada exitosamente" });
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      res.status(500).json({ error: "Error al guardar la nota" });
    }
  });
  
// Endpoint para asignar la categoría de sensibilidad
app.post('/api/listsensitivity', async (req, res) => {
  try {
    const { userID, itemID, category } = req.body;
    const database = client.db('sensitivv');
    const collection = database.collection('listsensitivity');

    // Verifica si ya existe una categoría para este producto y usuario
    const existingEntry = await collection.findOne({ userID, itemID });

    if (existingEntry) {
      if (existingEntry.category === category) {
        return res.status(200).json({ message: "El producto ya está en esta categoría." });
      }
      // Si la categoría es diferente, actualiza la entrada
      await collection.updateOne(
        { userID, itemID },
        { $set: { category } }
      );
      return res.status(200).json({ message: "Categoría actualizada exitosamente." });
    }

    // Si no existe, inserta una nueva entrada
    await collection.insertOne({ userID, itemID, category });
    res.status(201).json({ message: "Categoría de sensibilidad guardada exitosamente." });
  } catch (error) {
    console.error("Error al guardar la categoría de sensibilidad:", error);
    res.status(500).json({ error: "Error al guardar la categoría de sensibilidad." });
  }
});

    
// Obtener categoría de sensibilidad por usuario y itemID
app.get('/api/listsensitivity/:userID/:itemID', async (req, res) => {
    try {
      const { userID, itemID } = req.params;
      const database = client.db('sensitivv');
      const collection = database.collection('listsensitivity');
  
      const sensitivity = await collection.findOne({ userID, itemID });
      if (!sensitivity) {
        return res.status(404).json({ error: "No se encontró ninguna categoría de sensibilidad para este producto y usuario." });
      }
  
      res.status(200).json(sensitivity);
    } catch (error) {
      console.error("Error al obtener la categoría de sensibilidad:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
  app.post('/api/wishlist', async (req, res) => {
    try {
      const { userID, itemID, dateCreated, updatedAt } = req.body;
      const database = client.db('sensitivv');
      const collection = database.collection('wishlist');
  
      await collection.insertOne({ userID, itemID, dateCreated, updatedAt });
      res.status(201).json({ message: "Producto agregado a la wishlist" });
    } catch (error) {
      console.error("Error al agregar a la wishlist:", error);
      res.status(500).json({ error: "Error al agregar a la wishlist" });
    }
  });
  

// Ejemplo de un endpoint para obtener notas del producto
app.get('/api/productnotes/:userID/:itemID', async (req, res) => {
  try {
    const { userID, itemID } = req.params;
    const database = client.db('sensitivv');
    const collection = database.collection('productnotes'); // Nombre de colección ejemplo

    const productNote = await collection.findOne({ userID, itemID });
    if (productNote) {
      res.json(productNote);
    } else {
      res.status(404).json({ error: "No se encontraron notas para este producto" });
    }
  } catch (error) {
    console.error("Error al obtener notas del producto:", error);
    res.status(500).json({ error: "Error al obtener notas del producto" });
  }
});



// Obtener la wishlist de un usuario
app.get('/api/wishlist/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const database = client.db('sensitivv');
    const collection = database.collection('wishlist');

    const wishlistItems = await collection.find({ userID }).toArray();
    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error("Error al obtener la wishlist:", error);
    res.status(500).json({ error: "Error al obtener la wishlist" });
  }
});


  // Eliminar un producto de la wishlist
app.delete('/api/wishlist/:userID/:itemID', async (req, res) => {
  try {
    const { userID, itemID } = req.params;
    const database = client.db('sensitivv');
    const collection = database.collection('wishlist');

    const result = await collection.deleteOne({ userID, itemID });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado en la wishlist." });
    }

    res.status(200).json({ message: "Producto eliminado de la wishlist" });
  } catch (error) {
    console.error("Error al eliminar el producto de la wishlist:", error);
    res.status(500).json({ error: "Error al eliminar el producto de la wishlist" });
  }
});


// Obtener la wishlist de un usuario
app.get('/api/wishlist/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const database = client.db('sensitivv');
    const collection = database.collection('wishlist');

    const wishlistItems = await collection.find({ userID }).toArray();
    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error("Error al obtener la wishlist:", error);
    res.status(500).json({ error: "Error al obtener la wishlist" });
  }
});




app.get('/api/listsensitivity/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const database = client.db('sensitivv');
    const collection = database.collection('listsensitivity');
    
    const items = await collection.find({ userID }).toArray();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error al obtener los elementos:", error);
    res.status(500).json({ error: "Error al obtener los elementos" });
  }
});


// Endpoint para guardar el historial de acceso a un producto
app.post('/api/history', async (req, res) => {
  try {
    const { userID, itemID, dateAccessed } = req.body;
    const database = client.db('sensitivv');
    const collection = database.collection('history');

    // Inserta el historial en la base de datos
    await collection.insertOne({ userID, itemID, dateAccessed });

    res.status(201).json({ message: "Historial guardado exitosamente" });
  } catch (error) {
    console.error("Error al guardar el historial:", error);
    res.status(500).json({ error: "Error al guardar el historial" });
  }
});


// Endpoint para obtener el historial de productos vistos por un usuario con detalles
app.get('/api/history/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const database = client.db('sensitivv');
    const historyCollection = database.collection('history');

    // Obtener el historial de productos del usuario, ordenado por fecha (más reciente primero)
    const historyItems = await historyCollection
      .find({ userID })
      .sort({ dateAccessed: -1 })
      .limit(10)
      .toArray();

    // Obtener detalles de cada producto desde Open Food Facts
    const detailedItems = await Promise.all(
      historyItems.map(async (item) => {
        const productResponse = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${item.itemID}.json`);
        const product = productResponse.data.product;

        return {
          id: item._id,
          itemID: item.itemID,
          name: product ? product.product_name : "Nombre no disponible",
          imgSrc: product ? product.image_url : "https://via.placeholder.com/100", // Imagen de placeholder si no hay imagen
          dateAccessed: item.dateAccessed,
        };
      })
    );

    res.status(200).json(detailedItems);
  } catch (error) {
    console.error("Error al obtener el historial del usuario:", error);
    res.status(500).json({ error: "Error al obtener el historial del usuario" });
  }
});



// Endpoint para guardar el test realizado en la tabla "testmade"
app.post('/api/testmade', async (req, res) => {
  try {
    const { userID, itemID, dateCreated, DaysTestSelected } = req.body;
    const database = client.db('sensitivv');
    const collection = database.collection('testmade');

    // Inserta el registro en la base de datos
    await collection.insertOne({ userID, itemID, dateCreated, DaysTestSelected });

    res.status(201).json({ message: "Test guardado exitosamente" });
  } catch (error) {
    console.error("Error al guardar el test:", error);
    res.status(500).json({ error: "Error al guardar el test" });
  }
});



// Endpoint para obtener los tests realizados por un usuario
app.get('/api/testmade/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const database = client.db('sensitivv');
    const collection = database.collection('testmade');
    
    const tests = await collection.find({ userID }).sort({ dateCreated: -1 }).toArray();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error al obtener los tests:", error);
    res.status(500).json({ error: "Error al obtener los tests" });
  }
});


app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await clientG.verifyIdToken({
      idToken: token,
      audience: '785282538969-nhq7ursh8lkblr90a9rvi0qlg2ejjqmk.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    const name = payload['name'];

    res.json({ userId, name });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});


// Endpoint para buscar en la colección 'plainproducts'
app.get('/api/plainproducts', async (req, res) => {
  const { search } = req.query;
  try {
    const database = client.db('sensitivv');
    const collection = database.collection('plainproducts');
    const results = await collection
      .find({ name: { $regex: search, $options: 'i' } }) // Coincidencias parciales, case-insensitive
      .toArray();
    res.json(results);
  } catch (error) {
    console.error('Error buscando en plainproducts:', error);
    res.status(500).json({ error: 'Error buscando en plainproducts' });
  }
});











































// Inicia el servidor y conecta a la base de datos
app.listen(port, () => {
  connectToDatabase();
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
