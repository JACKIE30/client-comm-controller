const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const cliqRoutes=require('./routes/cliq.js');
// const waRoutes=require('./routes/wa.js')
const webhooks=require('./routes/webhooks.js');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// DB connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=>console.log('MongoDB connected'))
  .catch(e=>console.error('Mongo connect error', e));

// routes
app.use('/cliq', cliqRoutes);
// app.use('/api/wa', waRoutes);
app.use('/webhooks', webhooks);

// health
app.get('/', (req,res)=>res.send('Client Comm Controller OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));
