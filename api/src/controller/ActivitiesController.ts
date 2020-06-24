import { Response, Request } from 'express';
import knex from '../database/connection';

class ActivitiesController {
  async index(request: Request, response: Response): Promise<Response> {
    const activities = await knex('activities').select('*');

    const serializedActivities = activities.map(activity => {
      return {
        id: activity.id,
        title: activity.title,
        image_url: `http://192.168.100.5:3333/uploads/activities/${activity.image}`,
      };
    });

    return response.json(serializedActivities);
  }
}

export default ActivitiesController;
