import {Router, Request, Response} from 'express';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        msg: "All ok!"
    });
});

router.post('/messages', (req: Request, res: Response) => {
    
    const { name, text } = req.body;
    
    res.json({
        ok: true,
        name,
        text
    });
});

router.post('/messages/:id', (req: Request, res: Response) => {
    
    const { name, text } = req.body;
    const id = req.params.id;
    
    res.json({
        ok: true,
        name,
        text,
        id
    });
});

export default router;