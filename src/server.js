import express from 'express';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

import connectToDb from './config/db/index.js';
import routes from './routes/index.js';
// -----------------------------------

// Tạo instance app và port
const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Kết nối tới cơ sở dữ liệu
connectToDb();

// Config biến môi trường cho server
dotenv.config();

// --Sử dụng một số middleware--
// Dùng cors
app.use(cors());

// Hiển thị các thông tin từ request nhưng tạm thời chưa cần nên sẽ cmt lại
app.use(morgan('combined'));

// Sử dụng parse body cho các request
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Định nghĩa folder file tĩnh (static)
app.use(express.static(path.join(__dirname, 'public')));

// --Engine--
// Định nghĩa ra engine là handlebars và đổi tên đuôi của nó
app.engine(
    'hbs',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
    }),
);
// Sử dụng engine là handlebars vừa sử dụng ở trên
app.set('view engine', 'hbs');

// Set cái folder views cho app để nó biết sử dụng cái view engine
app.set('views', path.join(__dirname, 'resource', 'views'));

// --Định tuyến cho ứng dụng--
routes(app);

// Lắng nghe port
app.listen(process.env.PORT, () => console.log('Server start at port ' + PORT));
