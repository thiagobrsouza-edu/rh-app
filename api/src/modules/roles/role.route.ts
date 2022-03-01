import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { useRoleService } from "./role.service";

export const roleRoute = Router();
const service = useRoleService();

roleRoute.post('/',
  body('description').notEmpty().withMessage('Descrição é obrigatória'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const role = req.body;
      await service.save(role);
      res.status(201).json(role);
    } catch (error) {
      res.status(409).json(error.message);
    }
  }
);

roleRoute.get('/', async (req: Request, res: Response) => {
  const roles = await service.list();
  res.status(200).json(roles);
});

roleRoute.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const role = await service.getOne(id);
  res.status(200).json(role);
});

roleRoute.patch('/:id',
  body('description').notEmpty().withMessage('Descrição é obrigatória'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id);
    const role = req.body;
    try {
      await service.update(id, role);
      res.status(201).json(role);
    } catch (error) {
      res.status(409).json(error.message);
    }
  }
);

roleRoute.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await service.deleteOne(id);
    res.status(200).json([]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});