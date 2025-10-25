import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/tasks', taskRoutes);

// Serve bundled OpenAPI YAML and Swagger UI
app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(null, { swaggerOptions: { url: '/public/bundled.yaml' } })
);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
