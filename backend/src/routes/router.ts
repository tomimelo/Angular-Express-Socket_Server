import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { connectedUsers } from '../sockets/sockets';

const router = Router();

router.get('/users', (req: Request, res: Response) => {
            
    res.json({
        ok: true,
        users: connectedUsers.getList()
    });

});

router.get('/sockets', async (req: Request, res: Response) => {

    const server = Server.instance;

    try {

        const sockets = Array.from(await server.io.allSockets()); //ids obtained like a Set object, then converted to array
        
        res.json({
            ok: true,
            sockets
        });
        
    } catch (error) {

        res.json({
            ok: false,
            error
        });
        
    }

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