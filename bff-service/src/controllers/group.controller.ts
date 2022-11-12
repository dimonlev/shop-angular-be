import { Group } from '../models/group.type';
import { Request, Response } from 'express';
import { GroupStorage } from '../services/group.service';

class GroupController {
  constructor(private storageService: GroupStorage) {}

  async getAllGroups(req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.storageService.getAllGroups();
      res.send(groups);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const groups = await this.storageService.findById(req.params.groupId);
    try {
      if (!groups) {
        res.status(404).json({ message: 'groups not found' });
      } else {
        res.json(groups);
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const isGroupUniq = await this.storageService.findByName(req.body.name);
      const body: Omit<Group, 'id'> = JSON.parse(JSON.stringify(req.body));

      if (!isGroupUniq) {
        const group = await this.storageService.create(body);
        res.status(201).send(group);
      } else {
        res
          .status(400)
          .send({ message: 'groups already exists, please try another login' });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { body } = JSON.parse(JSON.stringify(req.body));
    try {
      const group = await this.storageService.update(req.params.groupId, body);
      res.json(group);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedGroups = await this.storageService.findById(
        req.params.groupId
      );
      if (!deletedGroups) {
        res.status(404).json({
          message: "havn't this groups, please check and try another request",
        });
      } else {
        await this.storageService.delete(req.params.groupId);
        res.json({ message: 'deleted' });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async addUsersToGroup(req: Request, res: Response): Promise<void> {
    const body = JSON.parse(JSON.stringify(req.body));
    try {
      console.log(body.usersId);
      console.log(req.params.groupId);
      await this.storageService.addUsersToGroup(
        req.params.groupId,
        body.usersId
      );

      res.json({ message: 'added' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
export { GroupController };
