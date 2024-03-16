import 'dotenv/config';
import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import { context } from './context';
import cors from 'cors';
import { product_list } from './product_list';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    console.log(process.env);
    res.send('Hello World!');
});

app.post('/api/ai', async(req: Request, res: Response) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env['OPENAI_API_KEY'],
        });
        console.log(process.env['OPENAI_API_KEY']);
        const prompt = req.body.prompt;
        const chat_completion = await openai.chat.completions.create({
          response_format: {type: 'json_object'},
          messages: [{role: 'system', content: context},{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
        });
        console.log(chat_completion.choices[0].message.content);
        if(chat_completion.choices[0].message.content != null){
            res.status(200).send(JSON.parse(chat_completion.choices[0].message.content));
        }  else {
            console.log("No response from AI", chat_completion.choices[0].message.content);
            res.status(500).send("No Item Found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get('/all-products', async(req: Request, res: Response) => {
    try {
        return res.status(200).send(product_list);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

const APP_PORT = 3000;

app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
});