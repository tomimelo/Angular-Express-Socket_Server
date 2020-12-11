import {Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        msg: "All ok!"
    });
});

router.post('/messages', (req: Request, res: Response) => {
    
    const { name, message } = req.body;

    const server = Server.instance;

    const payload = {
        name,
        message
    }

    server.io.emit("new-message", payload);
    
    res.json({
        ok: true,
        name,
        message
    });
});

router.post('/messages/:id', (req: Request, res: Response) => {
    
    const { name, message } = req.body;
    const id = req.params.id;

    const server = Server.instance;

    const payload = {
        name,
        message
    }

    server.io.in(id).emit("new-private-message", payload);

    
    res.json({
        ok: true,
        name,
        message,
        id
    });
});

export default router;