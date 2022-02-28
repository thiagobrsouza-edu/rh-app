import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { useDepartmentService } from "./department.service";

export const departmentRoute = Router();
const service = useDepartmentService();

departmentRoute.post('/',
  body('description').notEmpty().withMessage('Descrição é obrigatória'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const department = req.body;
      await service.save(department);
      res.status(201).json(department);
    } catch (error) {
      res.status(409).json(error.message);
    }
  }
);

departmentRoute.get('/', async (req: Request, res: Response) => {
  const departments = await service.list();
  res.status(200).json(departments);
});

departmentRoute.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const department = await service.getOne(id);
  res.status(200).json(department);
});

departmentRoute.patch('/:id',
  body('description').notEmpty().withMessage('Descrição é obrigatória'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id);
    const department = req.body;
    try {
      await service.update(id, department);
      res.status(201).json(department);
    } catch (error) {
      res.status(409).json(error.message);
    }
  }
);

departmentRoute.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await service.deleteOne(id);
    res.status(200).json([]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});