import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { useEmployeeService } from "./employee.service";

export const employeeRoute = Router();
const service = useEmployeeService();

employeeRoute.post('/',
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('cpf').notEmpty().withMessage('CPF é obrigatório'),
  body('birthDate').notEmpty().withMessage('Data de nascimento é obrigatória'),
  body('admission').notEmpty().withMessage('Admissão é obrigatória'),
  body('salary').notEmpty().withMessage('Salário é obrigatório'),
  body('role').notEmpty().withMessage('Cargo é obrigatório'),
  body('department').notEmpty().withMessage('Departamento é obrigatório'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const employee = req.body;
      await service.save(employee);
      res.status(201).json(employee);
    } catch (error) {
      res.status(409).json(error.message);
    }
  }
);

employeeRoute.get('/', async (req: Request, res: Response) => {
  const employees = await service.list();
  res.status(200).json(employees);
});

employeeRoute.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const employee = await service.getOne(id);
  res.status(200).json(employee);
});

employeeRoute.patch('/:id',
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('cpf').notEmpty().withMessage('CPF é obrigatório'),
  body('birthDate').notEmpty().withMessage('Data de nascimento é obrigatória'),
  body('admission').notEmpty().withMessage('Admissão é obrigatória'),
  body('salary').notEmpty().withMessage('Salário é obrigatório'),
  body('role').notEmpty().withMessage('Cargo é obrigatório'),
  body('department').notEmpty().withMessage('Departamento é obrigatório'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id);
    const employee = req.body;
    try {
      await service.update(id, employee);
      res.status(201).json(employee);
    } catch (error) {
      res.status(409).json(error.message);
    }
  }
);

employeeRoute.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await service.deleteOne(id);
    res.status(200).json([]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});